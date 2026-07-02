import { useCallback, useEffect, useRef, useState } from 'react';
import { CHORD_COUNT, KEYS, buildChordSet } from '../constants/chords';

const MIN_BPM = 40;
const MAX_BPM = 220;

function pickNextChordIdx(currentIdx: number) {
    let next = currentIdx;
    while (next === currentIdx) {
        next = Math.floor(Math.random() * CHORD_COUNT);
    }
    return next;
}

export function useMetronome() {
    const [playing, setPlaying] = useState(false);
    const [beat, setBeat] = useState(0);
    const [bpm, setBpmState] = useState(84);
    const [keyIdx, setKeyIdx] = useState(0);
    const [chordIdx, setChordIdx] = useState(4);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const ringRef = useRef<SVGCircleElement>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const musicalKey = KEYS[keyIdx];
    const chord = buildChordSet(musicalKey)[chordIdx];

    const restartRing = useCallback((currentBpm: number) => {
        const el = ringRef.current;
        if (!el) return;
        el.style.animation = 'none';
        // reflow を挟まないとアニメーションが再スタートしない
        void el.getBoundingClientRect();
        el.style.animation = `ring-sweep ${60 / currentBpm}s linear 1`;
    }, []);

    const playClick = useCallback((accent: boolean) => {
        const audioCtx = audioCtxRef.current;
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = accent ? 880 : 600;
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }, []);

    useEffect(() => {
        if (!playing) return;

        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();
        }
        restartRing(bpm);

        const id = setInterval(() => {
            setBeat((currentBeat) => {
                const nextBeat = (currentBeat + 1) % 4;
                playClick(nextBeat === 0);
                if (nextBeat === 0) {
                    setChordIdx(pickNextChordIdx);
                }
                return nextBeat;
            });
            restartRing(bpm);
        }, (60 / bpm) * 1000);

        return () => clearInterval(id);
    }, [playing, bpm, restartRing, playClick]);

    useEffect(() => {
        return () => {
            audioCtxRef.current?.close();
        };
    }, []);

    const toggle = useCallback(() => {
        setPlaying((prev) => {
            const next = !prev;
            if (!next) {
                setBeat(0);
                const el = ringRef.current;
                if (el) el.style.animation = 'none';
                audioCtxRef.current?.close();
                audioCtxRef.current = null;
            }
            return next;
        });
    }, []);

    const setBpm = useCallback((value: number) => {
        setBpmState(Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(value))));
    }, []);

    const selectKey = useCallback((idx: number) => {
        setKeyIdx(idx);
        setDropdownOpen(false);
    }, []);

    const toggleDropdown = useCallback(() => {
        setDropdownOpen((open) => !open);
    }, []);

    const closeDropdown = useCallback(() => {
        setDropdownOpen(false);
    }, []);

    return {
        playing,
        beat,
        bpm,
        keyIdx,
        chord,
        dropdownOpen,
        ringRef,
        toggle,
        setBpm,
        selectKey,
        toggleDropdown,
        closeDropdown,
    };
}
