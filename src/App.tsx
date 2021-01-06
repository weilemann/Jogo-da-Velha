import React, {useState, useEffect} from 'react';
import './App.css';

const App: React.FC = () => {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const checkWinner = () => {
      const possibleWaysToWin = [
        [board[0], board[1], board[2]],
        [board[3], board[4], board[5]],
        [board[6], board[7], board[8]],
  
        [board[0], board[3], board[6]],
        [board[1], board[4], board[7]],
        [board[2], board[5], board[8]],
  
        [board[0], board[4], board[8]],
        [board[2], board[4], board[6]],
      ];
  
      possibleWaysToWin.forEach(cells => {
        if(cells.every(cell => cell === "X")) setWinner("X")
        if(cells.every(cell => cell === "O")) setWinner("O")
      });

      checkDraw();
    }

    const checkDraw = () => {
      if(board.every(item => item !== "")) {
        setWinner("E");
      }
    }

    checkWinner();
  },[board])

  const handleCellClick = (index: number) => {
    if(winner) {
      console.log("Jogo finalizado");
      return null;
    }

    if(board[index] !== "") {
      console.log("Posição ocupada");
      return null;
    }

    var filledCell = board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item) 
    var player = currentPlayer === "O" ? "X" : "O"
    setBoard(filledCell);
    setCurrentPlayer(player);
  }

  const resetGame = () => {
    setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>
      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => {
          return(
            <div 
              key={index} 
              className={`cell ${item}`}
              onClick={() => handleCellClick(index)}
            >
              {item}
            </div>
          )
        })}
      </div>
      {winner &&
        <footer>
          {winner === "E" ?  
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
            </h2>
          :           
            <h2 className="winner-message">
              <span className={winner}>{winner}</span> venceu!
            </h2>
          }
          <button onClick={resetGame}>Recomeçar jogo</button>
        </footer>
      }
    </main>
  );
}

export default App;
