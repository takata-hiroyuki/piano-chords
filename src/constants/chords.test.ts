import { describe, expect, it } from 'vitest';
import { CHORD_COUNT, KEYS, buildChordSet } from './chords';

describe('buildChordSet', () => {
    it('Key=Cの場合、READMEのコード表と一致する9つの度数コードを返す', () => {
        const key = KEYS[0]; // C
        const chords = buildChordSet(key);

        expect(chords).toEqual([
            { name: 'Cmaj7', degree: 'Imaj7', formula: '1 3 5 7', notes: [0, 4, 7, 11] },
            { name: 'Dm7', degree: 'iim7', formula: '1 b3 5 b7', notes: [2, 5, 9, 0] },
            { name: 'Em7', degree: 'iiim7', formula: '1 b3 5 b7', notes: [4, 7, 11, 2] },
            { name: 'Fmaj7', degree: 'IVmaj7', formula: '1 3 5 7', notes: [5, 9, 0, 4] },
            { name: 'G7', degree: 'V7', formula: '1 3 5 b7', notes: [7, 11, 2, 5] },
            { name: 'G9', degree: 'V9', formula: '1 3 5 b7 9', notes: [7, 11, 2, 5, 9] },
            { name: 'Am7', degree: 'vim7', formula: '1 b3 5 b7', notes: [9, 0, 4, 7] },
            { name: 'Bm7b5', degree: 'viiø7', formula: '1 b3 b5 b7', notes: [11, 2, 5, 9] },
            { name: 'Dm9', degree: 'ii9', formula: '1 b3 5 b7 9', notes: [2, 5, 9, 0, 4] },
        ]);
    });

    it('度数(度数テーブルの並び)は9個で、Keyが変わっても数は変わらない', () => {
        expect(buildChordSet(KEYS[0])).toHaveLength(CHORD_COUNT);
        expect(buildChordSet(KEYS[6])).toHaveLength(CHORD_COUNT); // F#
    });

    it('シャープ系Key(D)では黒鍵の音名がシャープ表記になる', () => {
        const key = KEYS.find((k) => k.name === 'D')!;
        const chords = buildChordSet(key);
        const viiChord = chords[7]; // vii°7 (semitone 11 → root 2 + 11 = 13 % 12 = 1)

        expect(viiChord.name).toBe('C#m7b5');
        expect(viiChord.degree).toBe('viiø7');
    });

    it('フラット系Key(F)では黒鍵の音名がフラット表記になる', () => {
        const key = KEYS.find((k) => k.name === 'F')!;
        const chords = buildChordSet(key);
        const ivChord = chords[3]; // IVmaj7 (semitone 5 → root 5 + 5 = 10)

        expect(ivChord.name).toBe('Bbmaj7');
        expect(ivChord.notes).toEqual([10, 2, 5, 9]);
    });

    it('度数のローマ数字表記はKeyが変わっても同じになる', () => {
        const degreesForC = buildChordSet(KEYS[0]).map((c) => c.degree);
        const degreesForG = buildChordSet(KEYS.find((k) => k.name === 'G')!).map((c) => c.degree);

        expect(degreesForG).toEqual(degreesForC);
    });
});
