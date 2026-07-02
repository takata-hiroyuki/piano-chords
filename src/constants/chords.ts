export interface MusicalKey {
    name: string;
    root: number;
    flat: boolean;
}

// 五度圏順(C始まり、時計回り)
export const KEYS: MusicalKey[] = [
    { name: 'C', root: 0, flat: false },
    { name: 'G', root: 7, flat: false },
    { name: 'D', root: 2, flat: false },
    { name: 'A', root: 9, flat: false },
    { name: 'E', root: 4, flat: false },
    { name: 'B', root: 11, flat: false },
    { name: 'F#', root: 6, flat: false },
    { name: 'Db', root: 1, flat: true },
    { name: 'Ab', root: 8, flat: true },
    { name: 'Eb', root: 3, flat: true },
    { name: 'Bb', root: 10, flat: true },
    { name: 'F', root: 5, flat: true },
];

const NOTE_NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_NAMES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

interface ChordQuality {
    intervals: number[];
    suffix: string;
    degreeSuffix: string;
    formula: string;
}

const QUALITIES = {
    maj7: { intervals: [0, 4, 7, 11], suffix: 'maj7', degreeSuffix: 'maj7', formula: '1 3 5 7' },
    m7: { intervals: [0, 3, 7, 10], suffix: 'm7', degreeSuffix: 'm7', formula: '1 b3 5 b7' },
    dom7: { intervals: [0, 4, 7, 10], suffix: '7', degreeSuffix: '7', formula: '1 3 5 b7' },
    m7b5: { intervals: [0, 3, 6, 10], suffix: 'm7b5', degreeSuffix: 'ø7', formula: '1 b3 b5 b7' },
    dom9: { intervals: [0, 4, 7, 10, 2], suffix: '9', degreeSuffix: '9', formula: '1 3 5 b7 9' },
    m9: { intervals: [0, 3, 7, 10, 2], suffix: 'm9', degreeSuffix: '9', formula: '1 b3 5 b7 9' },
} satisfies Record<string, ChordQuality>;

interface DegreeDef {
    roman: string;
    quality: keyof typeof QUALITIES;
    semitone: number;
}

const DEGREES: DegreeDef[] = [
    { roman: 'I', quality: 'maj7', semitone: 0 },
    { roman: 'ii', quality: 'm7', semitone: 2 },
    { roman: 'iii', quality: 'm7', semitone: 4 },
    { roman: 'IV', quality: 'maj7', semitone: 5 },
    { roman: 'V', quality: 'dom7', semitone: 7 },
    { roman: 'V', quality: 'dom9', semitone: 7 },
    { roman: 'vi', quality: 'm7', semitone: 9 },
    { roman: 'vii', quality: 'm7b5', semitone: 11 },
    { roman: 'ii', quality: 'm9', semitone: 2 },
];

export const CHORD_COUNT = DEGREES.length;

export interface Chord {
    name: string;
    degree: string;
    formula: string;
    notes: number[];
}

export function buildChordSet(key: MusicalKey): Chord[] {
    const names = key.flat ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP;
    return DEGREES.map((degree) => {
        const quality = QUALITIES[degree.quality];
        const rootPitch = (key.root + degree.semitone) % 12;
        const notes = quality.intervals.map((interval) => (rootPitch + interval) % 12);
        return {
            name: names[rootPitch] + quality.suffix,
            degree: degree.roman + quality.degreeSuffix,
            formula: quality.formula,
            notes,
        };
    });
}
