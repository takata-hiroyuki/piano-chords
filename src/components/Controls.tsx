interface ControlsProps {
  tempo: number;
  setTempo: (tempo: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const Controls = ({ tempo, setTempo, isPlaying, setIsPlaying }: ControlsProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
          className="w-20 px-2 py-1 border rounded"
        />
        <span className="text-lg text-gray-700">BPM</span>
      </div>
      <div className="py-20 ">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-8 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </>
  );
};

