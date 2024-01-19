import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card";
import { shuffle } from "./lib/shuffle";

function App() {
  const [cards, setCards] = useState([
    "🍕",
    "🚗",
    "🎈",
    "🕶️",
    "🚦",
    "🚩",
    "🪠",
    "🔥",
    "🍕",
    "🚗",
    "🎈",
    "🕶️",
    "🚦",
    "🚩",
    "🪠",
    "🔥",
  ]);
  const [currentGuess, setCurrentGuess] = useState<number>(-1);
  const [correctSymbols, setCorrectSymbols] = useState([""]);
  const [guesses, setGuesses] = useState(0);
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    // TODO: shuffle cards
    setCards(shuffle(cards));
  }, []);

  function cardClicked(index: number): void {
    setCurrentGuess(index);
    checkGuess(index);
    if (currentGuess >= 0) setGuesses((prevState) => prevState + 1);
  }

  function checkGuess(index: number): void {
    const symbol = cards[index];

    if (cards[currentGuess] == symbol) {
      setCorrectSymbols((prevState) => [...prevState, symbol]);
      setCurrentGuess(-1);
    } else {
      setCurrentGuess(index);
    }

    if (correctSymbols.length == 8) checkNewHiscore(guesses + 1);
  }

  function checkNewHiscore(score: number) {
    if (score > highScore) setHighScore(score);
  }

  function reset(): void {
    setCorrectSymbols([""]);
    setGuesses(0);
    setCurrentGuess(-1);
    setCards(shuffle(cards));
  }

  return (
    <>
      <div className="scores">
        <p className="counter">Score: {guesses}</p>
        <p className="hi-score">High Score: {highScore}</p>
      </div>

      <div className="card-holder">
        {cards.map((symbol, index) => (
          <Card
            key={index}
            index={index}
            symbol={symbol}
            cardClicked={cardClicked}
            checkGuess={checkGuess}
            correctSymbols={correctSymbols}
            currentGuess={currentGuess}
          />
        ))}
      </div>

      <button className="reset" onClick={() => reset()}>
        Reset
      </button>
    </>
  );
}

export default App;
