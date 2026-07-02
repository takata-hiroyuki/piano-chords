import type { PointerEvent as ReactPointerEvent } from 'react';
import { bpmToAngle } from '../hooks/useBpmKnob';

interface BpmControlProps {
    bpm: number;
    onSliderChange: (value: number) => void;
    onKnobPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
}

const ACCENT = 'oklch(62% 0.16 35)';

export function BpmControl({ bpm, onSliderChange, onKnobPointerDown }: BpmControlProps) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, width: '100%', maxWidth: 300 }}>
            <div
                onPointerDown={onKnobPointerDown}
                style={{
                    position: 'relative',
                    width: 44,
                    height: 44,
                    flex: 'none',
                    cursor: 'grab',
                    touchAction: 'none',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: `2px solid ${ACCENT}`,
                        position: 'relative',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 2,
                        height: 17,
                        background: ACCENT,
                        transformOrigin: 'bottom center',
                        transform: `translate(-50%, -100%) rotate(${bpmToAngle(bpm)}deg)`,
                        pointerEvents: 'none',
                    }}
                />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ font: "700 28px/1 'Space Mono', monospace" }}>
                    {bpm}
                    <span
                        style={{
                            font: '400 12px/1 -apple-system, sans-serif',
                            color: 'oklch(55% 0.02 60)',
                            marginLeft: 6,
                        }}
                    >
                        BPM
                    </span>
                </div>
                <input
                    type="range"
                    min={40}
                    max={220}
                    value={bpm}
                    onChange={(e) => onSliderChange(Number(e.target.value))}
                    style={{ width: '100%', accentColor: ACCENT, marginTop: 6 }}
                />
            </div>
        </div>
    );
}
