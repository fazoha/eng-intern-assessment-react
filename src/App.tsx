
import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import Stopwatch from './StopWatch';
import './App.css';
function calculateTime(timeseconds:number):Array<number>{
    let hours : number = Math.floor(timeseconds/3600);
    let minutes: number= Math.floor((timeseconds-(hours*3600))/60);
    let seconds: number = Math.floor(timeseconds-(hours*3600)-(minutes*60));

    return[
        hours,
        minutes,
        seconds
    ];
}
function formattedLapTime(timeseconds:number): string {
    let hours : number = Math.floor(timeseconds/3600);
    let minutes: number= Math.floor((timeseconds-(hours*3600))/60);
    let seconds: number = Math.floor(timeseconds-(hours*3600)-(minutes*60));
    let formattedLapoutput =' ';
    if (hours>0){
        formattedLapoutput+= `${hours}h `;
    }
    if (minutes>0 || hours >0){
        formattedLapoutput+=(`${minutes}m `);
    }
    formattedLapoutput+=`${seconds}s`;
    return formattedLapoutput;

}

export default function App() {
    const [timeseconds,setTimeinSeconds]=useState<number>(0);
    const [timerArray,setTimerArray]=useState<number[]>([]);
    const [laps,setLaps] = useState<number[]>([]);
    useEffect(() =>{
        let timerArray: Array<number>=calculateTime(timeseconds);
    setTimerArray(timerArray);
},[timeseconds]);
const addLap = () => {
    if (timeseconds==0) return;
    setLaps(currentLaps => [...currentLaps, timeseconds]);
};
const resetLap = () => {
    setLaps([]); // Resets the laps array when we click the reset button
};


    


    


    return(
        <main>
        <div className='App'>
            <h1>My Stopwatch App</h1>
            <h2>By Farhan Atef Zoha</h2>
        <Stopwatch timerArray= {timerArray} setTimerArray={setTimerArray}/>        
        <StopWatchButton setTimeinSeconds = {setTimeinSeconds} addLap={addLap}  resetLap={resetLap}/>


        </div>
        <h2></h2>
        <ul>
                {laps.map((lapTime, index) => (
                    <li key={index}>Lap {index + 1}: {formattedLapTime(lapTime)} </li>
                ))}
            </ul>


        </main>
        
    )
}