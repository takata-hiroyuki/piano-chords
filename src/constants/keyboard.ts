export interface KeySlot {
    semitone: number;
    isBlack: boolean;
    // 黒鍵の場合、直前に位置する白鍵のインデックス
    blackAfter?: number;
}

// 1オクターブ + 閉じのCの13鍵
export const KEY_LAYOUT: KeySlot[] = [
    { semitone: 0, isBlack: false },
    { semitone: 1, isBlack: true, blackAfter: 0 },
    { semitone: 2, isBlack: false },
    { semitone: 3, isBlack: true, blackAfter: 1 },
    { semitone: 4, isBlack: false },
    { semitone: 5, isBlack: false },
    { semitone: 6, isBlack: true, blackAfter: 3 },
    { semitone: 7, isBlack: false },
    { semitone: 8, isBlack: true, blackAfter: 4 },
    { semitone: 9, isBlack: false },
    { semitone: 10, isBlack: true, blackAfter: 5 },
    { semitone: 11, isBlack: false },
    { semitone: 0, isBlack: false },
];

export const WHITE_KEY_COUNT = 8;
export const WHITE_KEY_WIDTH_PERCENT = 100 / WHITE_KEY_COUNT;
