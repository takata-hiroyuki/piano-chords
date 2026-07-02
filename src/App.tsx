import { useMetronome } from './hooks/useMetronome';
import { useBpmKnobDrag } from './hooks/useBpmKnob';
import { KeyDropdown } from './components/KeyDropdown';
import { ChordRing } from './components/ChordRing';
import { FormulaPill } from './components/FormulaPill';
import { PianoKeyboard } from './components/PianoKeyboard';
import { BpmControl } from './components/BpmControl';
import { PlayButton } from './components/PlayButton';

export default function App() {
    const {
        playing,
        beat,
        bpm,
        keyIdx,
        chord,
        dropdownOpen,
        ringRef,
        toggle,
        setBpm,
        selectKey,
        toggleDropdown,
        closeDropdown,
    } = useMetronome();

    const onKnobPointerDown = useBpmKnobDrag(setBpm);
    const isDownbeat = playing && beat === 0;

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f1ece2',
            }}
        >
            <div
                style={{
                    width: 380,
                    background: 'oklch(97% 0.012 75)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px 28px 28px',
                    boxSizing: 'border-box',
                    color: 'oklch(24% 0.015 60)',
                    borderRadius: 18,
                    boxShadow: `0 12px 30px rgba(40,30,20,.14), inset 0 0 0 ${isDownbeat ? 5 : 0}px oklch(62% 0.16 35 / 35%)`,
                    transition: 'box-shadow .5s ease-out',
                }}
            >
                <KeyDropdown
                    keyIdx={keyIdx}
                    degree={chord.degree}
                    open={dropdownOpen}
                    onToggle={toggleDropdown}
                    onClose={closeDropdown}
                    onSelect={selectKey}
                />
                <ChordRing chord={chord} beat={beat} playing={playing} ringRef={ringRef} />
                <FormulaPill formula={chord.formula} />
                <PianoKeyboard notes={chord.notes} />
                <BpmControl bpm={bpm} onSliderChange={setBpm} onKnobPointerDown={onKnobPointerDown} />
                <PlayButton playing={playing} onClick={toggle} />
            </div>
        </div>
    );
}
