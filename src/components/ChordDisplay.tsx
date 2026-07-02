interface ChordDisplayProps {
  chord: string;
  beat: number;
}

export const ChordDisplay = ({ chord, beat }: ChordDisplayProps) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="border-2 border-amber-600 rounded-lg px-16 py-8">
        <h1 className="text-6xl font-bold text-white tracking-wide">{chord}</h1>
      </div>
      <div className="flex space-x-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`text-3xl transition-colors ${
              i === beat ? 'text-amber-500' : 'text-gray-600'
            }`}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};
