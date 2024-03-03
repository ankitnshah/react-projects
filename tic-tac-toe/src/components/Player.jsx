import { useState } from "react"

export default function Player({name, symbol}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    return <li>
        <span className="player">
            {!isEditing && <span className="player-name">{playerName}</span>}
            {isEditing && <input onChange={(event) => setPlayerName(event.target.value)} value={playerName} type="text" required/>}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={() => setIsEditing((prevState) => !prevState)}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
}