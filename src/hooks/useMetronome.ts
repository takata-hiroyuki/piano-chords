import { useState, useEffect, useRef } from "react";
import { CHORDS } from "../components/chords";

export const useMetronome = (isPlaying: boolean, tempo: number) => {
  const [currentChord, setCurrentChord] = useState(CHORDS[0]);
  const [beat, setBeat] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if(audioCtxRef.current){
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      } 
      return;
    }

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    const interval = (60 / tempo) * 1000;
    const audioCtx = audioCtxRef.current;
    const id = setInterval(() => {
      setBeat((currentBeat) =>{
        const pitch = currentBeat === 3 ? 880 : 600;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = pitch;
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
        const nextBeat = (currentBeat + 1) % 4;
        if (nextBeat === 0){
          setCurrentChord(CHORDS[Math.floor(Math.random() * CHORDS.length)]);
        }
        return nextBeat;
        });
      }, interval);

      return () => clearInterval(id);
  }, [isPlaying, tempo]);

  return { currentChord, beat };
};

