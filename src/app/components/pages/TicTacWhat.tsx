"use client"
import { useState, useEffect } from "react";

type tileTypes = 
{
    state : string, 
    id : number, 
    hidden : boolean,
    playFunction : (n:number) => void
}
type boardTypes = 
{
    state : Array<string>
    playFunction : (n : number) => void
}

function Tile({state, id, hidden, playFunction} : tileTypes)
{
    let img = null
    const beanImg = "https://eaegnamwiiqzybxnxaid.supabase.co/storage/v1/object/sign/global/bean.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZDA1ZDcyMC0zOTQ3LTRiZWItYTc4OS1lNjIyOGYzOWUzNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJnbG9iYWwvYmVhbi5wbmciLCJpYXQiOjE3Nzg1ODcxOTAsImV4cCI6MTc4MTE3OTE5MH0.XmXr_zsrODjJ2L6Uq4J1VVN3QWbS22iDVW5PnJlgsUA"
    const leafImg = "https://eaegnamwiiqzybxnxaid.supabase.co/storage/v1/object/sign/global/leaf.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZDA1ZDcyMC0zOTQ3LTRiZWItYTc4OS1lNjIyOGYzOWUzNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJnbG9iYWwvbGVhZi5wbmciLCJpYXQiOjE3Nzg1ODcxOTksImV4cCI6MTc4MTE3OTE5OX0.en2PnxdoCQei4RKrYRyLRCcORXZCItXMP57aRwYRmTo"
    if (state == "X")
        img = <img className="imgTile" src={beanImg} ></img>
    else if (state ==  "O")
        img = <img className="imgTile" src={leafImg} ></img>
    return <div className={hidden ? "hiddenTile" : "gameTile"} onClick={() => playFunction(id)}>
            {img}
        </div>
}

function Board({state, playFunction} : boardTypes)
{
    console.log("updating board")
    return <>
        <div className="gameRow">
            <Tile state={state[0]} id={0} hidden={false} playFunction={playFunction}/>
            <Tile state={state[1]} id={1} hidden={false} playFunction={playFunction}/>
            <Tile state={state[2]} id={2} hidden={false} playFunction={playFunction}/>
        </div>
        <div className="gameRow">
            <Tile state={state[3]} id={3} hidden={false} playFunction={playFunction}/>
            <Tile state={state[4]} id={4} hidden={false} playFunction={playFunction}/>
            <Tile state={state[5]} id={5} hidden={false} playFunction={playFunction}/>
        </div>
        <div className="gameRow">
            <Tile state={state[6]} id={6} hidden={false} playFunction={playFunction}/>
            <Tile state={state[7]} id={7} hidden={false} playFunction={playFunction}/>
            <Tile state={state[8]} id={8} hidden={false} playFunction={playFunction}/>
        </div>
        <div className="gameRow">
            <Tile state={state[9]} id={9} hidden={true} playFunction={playFunction}/>
            <Tile state={state[10]} id={10} hidden={true} playFunction={playFunction}/>
            <Tile state={state[11]} id={11} hidden={true} playFunction={playFunction}/>
        </div>
    </>
}
export function TicTacWHat({validateTrial} : {validateTrial : (n : number) => void})
{
    const [boardState, updateBoard] = useState(Array(12).fill(""))
    const [winner, setWinner] = useState(-1)


    const minimax = (board: any, depth: number, isMaximizing: boolean): number => {
        // Check for winner
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let line of lines) {
            if (board[line[0]] !== "" && 
                board[line[0]] === board[line[1]] && 
                board[line[1]] === board[line[2]]) {
                return board[line[0]] === "O" ? 10 - depth : depth - 10;
            }
        }
        
        // Check for empty spaces
        let hasEmpty = false;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                hasEmpty = true;
                break;
            }
        }
        if (!hasEmpty) return 0;
        
        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    best = Math.max(best, minimax(board, depth + 1, false));
                    board[i] = "";
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    best = Math.min(best, minimax(board, depth + 1, true));
                    board[i] = "";
                }
            }
            return best;
        }
    };

    const aiPlay = (boardState : any, playerIndex : number) => 
    {
        let bestScore = -Infinity;
        let bestMove = 0;
       
        boardState[playerIndex] = "X"
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === "") {
                const testBoard = boardState.slice();
                testBoard[playerIndex] = "X";
                testBoard[i] = "O";
                const score = minimax(testBoard, 0, false);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        
        return bestMove;
    }

    const roomLeft = (board : any) =>
    {
        for (let i = 0; i < 9; i++)
            if (board[i] == "")
                return true
        return false
    }

    const playAtIndex = (index : number) =>
    {
        if (winner != -1)
            return ;
        if (index > 8 && index < 12)
            console.log("playing at " + index)
        let newBoard = Array(12).fill("")
        for (let i = 0; i < 12; i++)
            newBoard[i] = boardState[i]
        if (newBoard[index] == "")
        {
            newBoard[index] = "X"
            if (roomLeft(newBoard))
            {
                const aiIndex = aiPlay(boardState, index)
                newBoard[aiIndex] = "O"
            }
            checkWinner(newBoard)
            updateBoard(newBoard)
        }
    }

    const checkWinner = (boardState : Array<string>) =>
    {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            [9, 10 , 11], 
            [3, 6, 9],
            [4, 7, 10],
            [5, 8, 11],
            [3, 7, 11],
            [5, 7, 9] 
        ]
        for (let line of lines)
        {
            for (let i = 0; i < 3; i++)
            {
                if (boardState[line[0]] == boardState[line[1]] && boardState[line[1]] == boardState[line[2]])
                {
                    if (boardState[line[0]] == "X")
                    {
                        setWinner(0)
                        return ;
                    }
                    else if (boardState[line[1]] == "O")
                    {
                        setWinner(1)
                        return ;
                    }
                }
            }
        }
        let filledTiles = 0
        for (let i = 0; i < 9; i++)
        {
            if (boardState[i] != "")
                filledTiles++
        }
        if (filledTiles == 9)
            setWinner(2)
    }
    
    let winZone = null
        switch (winner)
    {
        case (0):
            winZone = <div>Player "X" won !</div>
            break 
        case (1):
            winZone = <div>Player "O" won !</div>
            break
        case (2):
            winZone = <div>Draw !</div>
            break
    }
    const reset = () =>
    {
        updateBoard(Array(12).fill(""))
        setWinner(-1)
    }
    return  <div>
                <Board state={boardState} playFunction={playAtIndex} />
                {winZone}
                <button className="my-4" onClick={reset}>Reset Game</button>
                {winner == 0  && <button className="my-4" onClick={() => validateTrial(5)}>Bien ouej ! On passe a la suite !</button>}
            </div>
}