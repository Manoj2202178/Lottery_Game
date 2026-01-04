import { useState } from "react";
import "./Lottery.css"
import Ticket from "./Ticket.jsx";

function sum(arr){
    let s=0;
    for(let val of arr){
        s+=val
    }
    return s;
}

function genTicket(n){
    let arr=new Array(n);
    for(let i=0; i<n; i++){
        arr[i]=Math.floor(Math.random()*10)
    }
    return arr;
}


export default function Lottery({n=3}){
    let [userNums, setUserNums]=useState([0,0]);
    let [ticket, setTicket] = useState(genTicket(n));
    const [showRules, setShowRules] = useState(false);
    let isWinning = userNums.includes(sum(ticket));
    function buyTicket(){
        setTicket(genTicket(n));
    }
    function handleChange(idx, value){
        if (value < 0 || value > 27) return;

        let updatedNums=[...userNums]
        updatedNums[idx]=Number(value)
        setUserNums(updatedNums);
    }
    return (
        <div>
            <h1>Lottery Game</h1>
            <div className="rules">
                <h3 onClick={() => setShowRules(!showRules)} className="rules-title">
                    Rules of the Game {showRules ? "▲" : "▼"}
                </h3>
                {showRules && (
                <div className="rules-content">
                    <p>🎯 Pick 2 numbers (0–27)</p>
                    <p>🎟️ A ticket with 3 random digits is generated.</p>
                    <p>➕ Their sum is calculated.</p>
                    <p>🏆 If the sum matches any one of your numbers, you win!</p>
                    <p>💡 Tip: Choosing numbers closer to the middle (10–18) gives better chances.</p>
                </div>
)}
            </div>
            <h3>Pick any two numbers</h3>
            {userNums.map((num, idx)=>(
                <input className="input" key={idx} type="number" min="0" max="27" value={num} onChange={(e=>handleChange(idx, e.target.value))} />
            ))}
            <br /><br />
            <div className="gameArea">
                <Ticket ticket={ticket}></Ticket>
            </div>
            <br />
            <button onClick={buyTicket}>Buy New Ticket</button>
            <h3>{isWinning && "Congratulations, You won!🎉"}</h3>
        </div>
    )
}