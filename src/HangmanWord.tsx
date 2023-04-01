type HangmanWordProps = {
    guessedLetters : string[],
    wordToGuess : string,
    isGameOver? : boolean
}

export function HangmanWord({guessedLetters, wordToGuess , isGameOver} : HangmanWordProps) {
    //const word = "TEST"
    //const guessedLetters = ["T","E"]
    return <div style={{
        display: "flex",
        gap : ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace"
    }}>

        {wordToGuess.split("").map((letter, index)=>(
            <span style={{borderBottom: ".1em solid black"}} key={index}>
                <span style={{
                    visibility: (guessedLetters.includes(letter) || isGameOver) ?  "visible" : "hidden",
                    color: (guessedLetters.includes(letter)) ? "green" : "red"
                }}>
                    {letter}
                </span>
            </span>
        ))}
    </div>
}