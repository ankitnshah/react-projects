
export default function GameBoard({onSelectSquare, gameBaord}) {
    return <ol id="game-board">
        {gameBaord.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}><button disabled={playerSymbol != null} onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}
    </ol>
}