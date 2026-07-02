import { describe, expect, it } from 'vitest';
import { bpmToAngle } from './useBpmKnob';

describe('bpmToAngle', () => {
    it('最小BPM(40)は-135度になる', () => {
        expect(bpmToAngle(40)).toBe(-135);
    });

    it('最大BPM(220)は135度になる', () => {
        expect(bpmToAngle(220)).toBe(135);
    });

    it('中間のBPM(130)は0度になる', () => {
        expect(bpmToAngle(130)).toBe(0);
    });

    it('BPMが大きいほど角度も大きくなる(単調増加)', () => {
        expect(bpmToAngle(60)).toBeLessThan(bpmToAngle(120));
        expect(bpmToAngle(120)).toBeLessThan(bpmToAngle(180));
    });
});
