import { useCallback } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

const MIN_ANGLE = -135;
const MAX_ANGLE = 135;
const MIN_BPM = 40;
const MAX_BPM = 220;

export function bpmToAngle(bpm: number) {
    return MIN_ANGLE + ((bpm - MIN_BPM) / (MAX_BPM - MIN_BPM)) * (MAX_ANGLE - MIN_ANGLE);
}

export function useBpmKnobDrag(onChange: (bpm: number) => void) {
    return useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const move = (ev: PointerEvent) => {
                const dx = ev.clientX - cx;
                const dy = ev.clientY - cy;
                let theta = (Math.atan2(dx, -dy) * 180) / Math.PI;
                theta = Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, theta));
                const bpm = MIN_BPM + ((theta - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE)) * (MAX_BPM - MIN_BPM);
                onChange(bpm);
            };
            const up = () => {
                window.removeEventListener('pointermove', move);
                window.removeEventListener('pointerup', up);
            };
            move(e.nativeEvent);
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up);
        },
        [onChange],
    );
}
