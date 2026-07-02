interface ControlsProps {
  tempo: number;
  setTempo: (tempo: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export function Controls({
  tempo,
  setTempo,
  isPlaying,
  setIsPlaying,
}: ControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-4 w-64">
      <div className="flex items-center space-x-3 w-full">
        <input
          type="range"
          min="40"
          max="200"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
          className="w-full accent-amber-500"
        />
        <span className="text-amber-400 font-semibold w-16 text-right">
          {tempo} BPM
        </span>
      </div>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full px-6 py-3 text-lg font-bold text-gray-900 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
      >
        {isPlaying ? '⏹ STOP' : '▶ PLAY'}
      </button>
    </div>
  );
}
