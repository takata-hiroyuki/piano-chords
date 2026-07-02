import { useEffect, useRef } from 'react';
import { KEYS } from '../constants/chords';

interface KeyDropdownProps {
    keyIdx: number;
    degree: string;
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    onSelect: (idx: number) => void;
}

const TEXT_COLOR = 'oklch(30% 0.02 60)';
const ACCENT = 'oklch(62% 0.16 35)';

export function KeyDropdown({ keyIdx, degree, open, onToggle, onClose, onSelect }: KeyDropdownProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onClose]);

    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: 300,
                position: 'relative',
            }}
        >
            <button
                onClick={onToggle}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    border: 'none',
                    background: 'oklch(93% 0.015 75)',
                    padding: '6px 10px 6px 12px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    font: "600 12px/1 'Space Mono', monospace",
                    letterSpacing: '.1em',
                    color: TEXT_COLOR,
                }}
            >
                KEY: {KEYS[keyIdx].name}
                <span style={{ fontSize: 9, opacity: 0.6 }}>▾</span>
            </button>

            <div
                style={{
                    font: "700 12px/1 'Space Mono', monospace",
                    letterSpacing: '.06em',
                    color: ACCENT,
                    background: 'oklch(93% 0.03 35)',
                    padding: '4px 9px',
                    borderRadius: 6,
                }}
            >
                {degree}
            </div>

            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: 34,
                        left: 0,
                        zIndex: 10,
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 12px 28px rgba(40,30,20,.22)',
                        padding: 8,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 4,
                        width: 216,
                    }}
                >
                    {KEYS.map((k, i) => {
                        const active = i === keyIdx;
                        return (
                            <button
                                key={k.name}
                                onClick={() => onSelect(i)}
                                style={{
                                    border: 'none',
                                    borderRadius: 7,
                                    padding: '8px 0',
                                    cursor: 'pointer',
                                    font: "600 12px/1 'Space Mono', monospace",
                                    background: active ? ACCENT : 'oklch(96% 0.008 75)',
                                    color: active ? '#fff' : TEXT_COLOR,
                                }}
                            >
                                {k.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
