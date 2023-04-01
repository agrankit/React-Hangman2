import { useCallback, useEffect, useState } from "react";

import words from "./wordList.json"
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

const getRandom = () => {
  return Math.floor(Math.random() * words.length);
}

function App  ()  {
  const [wordToGuess,setWordToGuess] = useState(words[getRandom()]);
  const [guessedLetters,setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLooser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  // problematic
  function addGuessedLetter (letter: string){
    if(!guessedLetters.includes(letter)){
      setGuessedLetters(currentLetters => [...currentLetters , letter])
    }
  }

  const addGuessedLetterCallback = useCallback((letter: string)=>{
    console.log("Key pressed " , letter)
    console.log("Word to Guess ", wordToGuess)
    const letterToLowercase = letter.toLocaleLowerCase();
    if(!guessedLetters.includes(letterToLowercase)){
      setGuessedLetters(currentLetters => [...currentLetters , letterToLowercase])
    }
  },[guessedLetters])

  useEffect (() => {
    const handler = (e : KeyboardEvent) => {
      const key = e.key;
      if(!key.match(/^[a-z]$/)){
        return;
      }

      e.preventDefault();
      addGuessedLetterCallback(key);
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress",handler)
    }
  } , [guessedLetters])


  return (
    <div style={{
      maxWidth : "800px",
      display : "flex",
      flexDirection : "column",
      gap : "2rem",
      margin : "0 auto",

      alignItems : "center"
    }}>
      <div style={{
        fontSize : "2rem" , textAlign : "center"
      }}>
        {isWinner && "You Win! refresh to try again"}
        {isLooser && "Nice Try! refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses = {incorrectLetters.length}/>
      <HangmanWord guessedLetters = {guessedLetters} wordToGuess = {wordToGuess} isGameOver={isLooser || isWinner}/>
      <div style={{alignSelf: "stretch"}}><Keyboard addKeyToGuessedList={addGuessedLetterCallback} disabled={isLooser || isWinner}/></div>
      
    </div>
  );
}

export default App;