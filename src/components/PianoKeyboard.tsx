import { KEY_LAYOUT, WHITE_KEY_WIDTH_PERCENT } from '../constants/keyboard';

interface PianoKeyboardProps {
    notes: number[];
}

export function PianoKeyboard({ notes }: PianoKeyboardProps) {
    return (
        <div
            style={{
                display: 'flex',
                gap: 5,
                marginTop: 16,
                height: 52,
                alignItems: 'flex-end',
                width: '100%',
                maxWidth: 300,
                justifyContent: 'center',
            }}
        >
            {KEY_LAYOUT.map((slot, i) => {
                const highlighted = notes.includes(slot.semitone);
                return (
                    <div
                        key={i}
                        style={{
                            position: 'relative',
                            width: slot.isBlack ? 0 : `${WHITE_KEY_WIDTH_PERCENT}%`,
                            height: 52,
                            border: '1px solid oklch(85% 0.01 70)',
                            borderRadius: '0 0 4px 4px',
                            background: slot.isBlack ? 'transparent' : highlighted ? 'oklch(88% 0.07 35)' : '#fff',
                        }}
                    >
                        {slot.isBlack && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -1,
                                    left: `${(slot.blackAfter! + 1) * WHITE_KEY_WIDTH_PERCENT - 4.5}%`,
                                    width: 14,
                                    height: 33,
                                    borderRadius: '0 0 3px 3px',
                                    background: highlighted ? 'oklch(45% 0.1 35)' : 'oklch(20% 0.01 60)',
                                    zIndex: 2,
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
