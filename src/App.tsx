import { useState, useEffect, useRef} from "react";
import { CHORDS } from "./constants/chords";

export default function App() {
  const [tempo, setTempo] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChord, setCurrentChord] = useState(CHORDS[0]);
  const [beat, setBeat] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null); 

  useEffect(() => {
    if (!isPlaying) {
      if(audioCtxRef.current){
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      } 
      return;
    }

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    const interval = (60 / tempo) * 1000;
    const audioCtx = audioCtxRef.current;
    const id = setInterval(() => {
      setBeat((currentBeat) =>{
        const pitch = currentBeat === 3 ? 880 : 600;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = pitch;
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
        const nextBeat = (currentBeat + 1) % 4;
        if (nextBeat === 0){
          setCurrentChord(CHORDS[Math.floor(Math.random() * CHORDS.length)]);
        }
        return nextBeat;
        });
      }, interval);

      return () => {
        clearInterval(id);
      };
  }, [isPlaying, tempo]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-gray-100">
      <h1 className="text-5xl font-bold">{currentChord}</h1>
      <p className="text-xl">Beat: {beat + 1}</p>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-20 px-2 py-1 boder rounded"
            />
          <span className="text-lg text-gray-700">BPM</span>
        </div>
      </div>
      <div className="py-20 ">
        <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-8 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  )
}