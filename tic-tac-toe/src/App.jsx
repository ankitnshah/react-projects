import Player from "./components/Player"
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { useState } from "react"
import {winningCombinations} from './assets/winningCombinations';
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  "X": "Player 1",
  "O": "Player 2"
}

function deriveActivePlayer(turns) {
  let player = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    player = 'O';
  }
  return player;
}

function deriveWinner(gameBaord, playerState) {
  let winner;
  for (let combination of winningCombinations) {
    const fValue = gameBaord[combination[0].row][combination[0].col];
    const sValue = gameBaord[combination[1].row][combination[1].col];
    const tValue = gameBaord[combination[2].row][combination[2].col];
    if (fValue && fValue === sValue && fValue === tValue) {
      winner = playerState[fValue];
    }
  }
  return winner;
}

function deriveGameBoard(turns) {
  let gameBaord = [...INITIAL_GAME_BOARD].map(row => [...row]);
  for (let turn of turns) {
    gameBaord[turn.square.row][turn.square.col] = turn.player;
  }
  return gameBaord;
}

function App() {
  const [playerState, setPlayerState] = useState(PLAYERS);

  function handlePlayerStateChange(symbol, newName) {
    setPlayerState(prevState => {
      return {
        ...prevState,
        [symbol]: newName
      }
    });
  }

  const [turns, setTurns] = useState([]);
  let activePlayer = deriveActivePlayer(turns);
  let gameBaord = deriveGameBoard(turns);
  let winner = deriveWinner(gameBaord, playerState);

  

  function onSelectSquare(rowIndex, colIndex) {
    setTurns(prevTurns => {
      let player = deriveActivePlayer(prevTurns);
      const newTurns = [{
        player: player,
        square: {
          row: rowIndex,
          col: colIndex
        }
      }, ...prevTurns];
      return newTurns;
    })
  }

  function restartMatch() {
    setTurns([]);
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player handlePlayerStateChange={handlePlayerStateChange} name="Player 1" symbol="X" isActive={activePlayer === 'X'}></Player>
        <Player handlePlayerStateChange={handlePlayerStateChange}  name="Player 2" symbol="O" isActive={activePlayer === 'O'}></Player>
      </ol>
      {(winner || turns.length == 9) && <GameOver restartMatch={restartMatch} winner={winner}/>}
      <GameBoard gameBaord={gameBaord} activePlayerSymbol={activePlayer} onSelectSquare={onSelectSquare} />
    </div>
    <Log turns={turns} />
  </main>
}

export default App
