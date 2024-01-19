export default function Card({
  index,
  symbol,
  cardClicked,
  correctSymbols,
  currentGuess,
}: {
  index: number;
  symbol: string;
  cardClicked(index: number): void;
  checkGuess(index: number): void;
  correctSymbols: string[];
  currentGuess: number | null;
}) {
  return (
    <div
      key={index}
      className="card"
      onClick={() => {
        cardClicked(index);
      }}
    >
      {currentGuess == index || correctSymbols.includes(symbol) ? symbol : "❔"}
    </div>
  );
}
