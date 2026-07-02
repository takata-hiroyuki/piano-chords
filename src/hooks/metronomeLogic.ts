export const MIN_BPM = 40;
export const MAX_BPM = 220;

export function clampBpm(value: number): number {
    return Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(value)));
}

export function pickNextChordIdx(currentIdx: number, chordCount: number): number {
    if (chordCount <= 1) return currentIdx;
    let next = currentIdx;
    while (next === currentIdx) {
        next = Math.floor(Math.random() * chordCount);
    }
    return next;
}
