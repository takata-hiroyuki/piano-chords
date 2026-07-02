interface FormulaPillProps {
    formula: string;
}

export function FormulaPill({ formula }: FormulaPillProps) {
    return (
        <div
            style={{
                font: "400 12px/1 'Space Mono', monospace",
                color: 'oklch(55% 0.03 60)',
                letterSpacing: '.05em',
                background: 'oklch(94% 0.012 75)',
                padding: '5px 12px',
                borderRadius: 999,
                marginTop: 12,
            }}
        >
            {formula}
        </div>
    );
}
