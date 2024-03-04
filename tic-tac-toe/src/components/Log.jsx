export default function Log({turns}) {
    return <ol id="log">
        {turns.map((turn) => {
            let uniqueKey = `${turn.square.row}-${turn.square.col}`;
            return <li key={uniqueKey}>{turn.player} selected Sqaure {turn.square.row},{turn.square.col}</li>
        })}
    </ol>
} 