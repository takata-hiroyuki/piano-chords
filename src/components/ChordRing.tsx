import type { RefObject } from 'react';
import type { Chord } from '../constants/chords';

interface ChordRingProps {
    chord: Chord;
    beat: number;
    playing: boolean;
    ringRef: RefObject<SVGCircleElement | null>;
}

function nameStyle(name: string) {
    const len = name.length;
    const size = len <= 2 ? 60 : len <= 4 ? 46 : len <= 6 ? 36 : 28;
    const weight = len <= 4 ? 700 : 600;
    const tracking = len <= 2 ? '-.02em' : '-.01em';
    return { size, weight, tracking };
}

export function ChordRing({ chord, beat, playing, ringRef }: ChordRingProps) {
    const isDownbeat = playing && beat === 0;
    const { size: nameSize, weight: nameWeight, tracking: nameTracking } = nameStyle(chord.name);

    return (
        <div style={{ position: 'relative', width: 238, height: 238, marginTop: 18 }}>
            <svg width={238} height={238} viewBox="0 0 260 260" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={130} cy={130} r={120} fill="none" stroke="oklch(91% 0.015 75)" strokeWidth={14} />
                <circle
                    ref={ringRef}
                    cx={130}
                    cy={130}
                    r={120}
                    fill="none"
                    stroke={isDownbeat ? 'oklch(50% 0.19 35)' : 'oklch(62% 0.16 35)'}
                    strokeWidth={isDownbeat ? 17 : 14}
                    strokeLinecap="round"
                    strokeDasharray={754}
                    style={{ transition: 'stroke .15s ease-out, stroke-width .15s ease-out' }}
                />
            </svg>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 10,
                    padding: '0 28px',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        font: `${nameWeight} ${nameSize}px/1 -apple-system, sans-serif`,
                        letterSpacing: nameTracking,
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                >
                    {chord.name}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {[0, 1, 2, 3].map((i) => {
                        const active = playing && i === beat;
                        const isFirstBeat = i === 0;
                        const dotSize = active && isFirstBeat ? 9 : 7;
                        const color = active
                            ? isFirstBeat
                                ? 'oklch(50% 0.19 35)'
                                : 'oklch(62% 0.16 35)'
                            : 'oklch(88% 0.01 70)';
                        return (
                            <div
                                key={i}
                                style={{
                                    width: dotSize,
                                    height: dotSize,
                                    borderRadius: '50%',
                                    background: color,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
