import { useState } from "react";
import { useMetronome } from "./hooks/useMetronome";
import { ChordDisplay } from "./components/ChordDisplay";
import { Controls } from "./components/Controls";

export default function App() {
  const [tempo, setTempo] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentChord, beat } = useMetronome(isPlaying, tempo);
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-gray-900">
      <h2 className="text-amber-500 text-lg tracking-widest uppercase font-semibold">piano chords</h2>
      <ChordDisplay chord={currentChord} beat={beat} />
      <Controls
        tempo={tempo}
        setTempo={setTempo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying} />
    </div>
  );
}