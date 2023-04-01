import  "./Keyboard.css";

const KEYS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

type KeyboardProps = {
    disabled? : boolean
    addKeyToGuessedList : (letter : string) => void
}

export function Keyboard({addKeyToGuessedList,disabled} : KeyboardProps){
    return <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(75px , 1fr))",
        gap: ".5rem"
    }}>
        {KEYS.map((key) => {
            return <button className="Keyboard-btn" key={key} onClick={() => addKeyToGuessedList(key)} disabled={disabled}>
                {key}
            </button>
        })}
    </div>
}