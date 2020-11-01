import React from "react"

function App() {
    const STARTING_TIME = 2
    
    const [text, setText] = React.useState("")
    const [timeRemaining, setTimeRemaining] = React.useState(STARTING_TIME)
    const [isGameRunning, setisGameRunning] = React.useState(false)
    const [wordCount, setWordCount] = React.useState(0)
    const [displayEndGame, setDisplayEndGame] = React.useState(false)
    const textBoxRef = React.useRef(null)
    
    
    const textAreaOnChangeHandler = (event) => {
        setText(event.target.value)
    }

    const startGame = () => {
        setisGameRunning(true)
        setTimeRemaining(STARTING_TIME)
        setText("")
        setDisplayEndGame(false)
    }

    React.useEffect(() => {
        if(displayEndGame && !isGameRunning) {
            let arrayOfWords = text.split(' ').filter(item => item.length > 0)
            setWordCount(arrayOfWords.length)
            console.log(arrayOfWords)
        }
    },[displayEndGame])
    
    React.useEffect(() => {
        if(isGameRunning && timeRemaining > 0) { //start the game
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) { //end the game
            setisGameRunning(false)
            setDisplayEndGame(true)
        }
    }, [timeRemaining, isGameRunning])
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                ref={textBoxRef}
                value={text}
                onChange={textAreaOnChangeHandler}
                disabled={!isGameRunning}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button 
                onClick={startGame}
                disabled={isGameRunning}
            >
                Start
            </button>
            <h1>Word count: {wordCount}</h1>
        </div>
    )
}

export default App
