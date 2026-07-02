interface PlayButtonProps {
    playing: boolean;
    onClick: () => void;
}

export function PlayButton({ playing, onClick }: PlayButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{
                marginTop: 'auto',
                width: '100%',
                maxWidth: 300,
                border: 'none',
                borderRadius: 999,
                padding: 17,
                font: '700 15px/1 -apple-system, sans-serif',
                letterSpacing: '.04em',
                cursor: 'pointer',
                background: playing ? 'oklch(62% 0.16 35)' : 'oklch(24% 0.015 60)',
                color: '#fff',
                animation: playing ? 'pulse-ring 1.1s ease-out infinite' : 'none',
            }}
        >
            {playing ? '■  STOP' : '▶  START'}
        </button>
    );
}
