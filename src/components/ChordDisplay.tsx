interface ChordDisplayProps {
  chord: string;
  beat: number;
}

export const ChordDisplay = ({ chord, beat }: ChordDisplayProps) => {
  return (
    <>
      <h1 className="text-5xl font-bold">{chord}</h1>
      <p className="text-xl">Beat: {beat + 1}</p>
    </>
  );
};

