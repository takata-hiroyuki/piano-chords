import { afterEach, describe, expect, it, vi } from 'vitest';
import { MAX_BPM, MIN_BPM, clampBpm, pickNextChordIdx } from './metronomeLogic';

describe('clampBpm', () => {
    it('範囲内の値はそのまま(四捨五入して)返す', () => {
        expect(clampBpm(83.6)).toBe(84);
    });

    it('下限(40)を下回る値は40にクランプする', () => {
        expect(clampBpm(10)).toBe(MIN_BPM);
    });

    it('上限(220)を上回る値は220にクランプする', () => {
        expect(clampBpm(300)).toBe(MAX_BPM);
    });
});

describe('pickNextChordIdx', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('コードが1つしかない場合は同じインデックスを返す(無限ループしない)', () => {
        expect(pickNextChordIdx(0, 1)).toBe(0);
    });

    it('何度呼び出しても直前のインデックスとは異なる値を返す', () => {
        for (let i = 0; i < 200; i++) {
            expect(pickNextChordIdx(3, 9)).not.toBe(3);
        }
    });

    it('Math.randomが最初に直前と同じインデックスを引いても再抽選する', () => {
        const randomSpy = vi.spyOn(Math, 'random');
        // 1回目: 0/9 → 直前と同じ0が出るので再抽選、2回目: 4/9 → 4が採用される
        randomSpy.mockReturnValueOnce(0).mockReturnValueOnce(4 / 9);

        expect(pickNextChordIdx(0, 9)).toBe(4);
        expect(randomSpy).toHaveBeenCalledTimes(2);
    });
});
