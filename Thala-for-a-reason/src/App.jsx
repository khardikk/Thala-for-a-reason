import './App.css'
import React, { useState } from 'react';
import bgm from './assets/bgm.mp3'; 
import thalaImg from './assets/thala.gif';
import tryAgainImg from './assets/try-again-lee.gif';
import Confetti from 'react-dom-confetti';

function App() {
  const [input, setInput] = useState('');
  const [showGif, setShowGif] = useState(false);
  const [showAltGif, setShowAltGif] = useState(false);
  const [audio] = useState(new Audio(bgm));
  const [isPlaying, setIsPlaying] = useState(false); // new state to track if audio is playing
  const [transformedInput, setTransformedInput] = useState('');

  const confettiConfig = {
    angle: 180,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 5000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "800px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    let isThala = false;
    let sum = 0;
  
    if (!isNaN(input)) {
      sum = input.split('').reduce((a, b) => a + Number(b), 0);
      if (sum === 7 || Number(input) === 7) {
        isThala = true;
      }
    } else {
      if(input.length !== 7) {
        isThala = false;
    } else {
      if (input.length === 7) {
        isThala = true;
      }
    } 
    }
     
  
    if (isThala) {
      setShowGif(true);
      audio.play();
      setIsPlaying(true); // set isPlaying to true when audio starts
      if (!isNaN(input)) {
        setTransformedInput(input.split('').map(Number).join(' + ') + ' = 7');
      } else {
        setTransformedInput(input.split('').join(' + ') + ' = 7');
      }
    } else {
      if (!isNaN(input)) {
        const diff = sum - 7;
        if (diff > 0) {
          setTransformedInput(input.split('').map(Number).join(' + ') + ' - ' + diff + ' = 7');
          setShowGif(true);
          audio.play();
          setIsPlaying(true); // set isPlaying to true when audio starts
        } else if (diff < 0) {
          const add = 7 - sum;
          setTransformedInput(input + ' + ' + add + ' = 7');
          setShowGif(true);
          audio.play();
          setIsPlaying(true); // set isPlaying to true when audio starts
        }
      } else {
        setTransformedInput('This is not equal to 7 therefore not Thala, try another one');
        console.log("hello")
        setShowAltGif(true);

      }
    }
  };

  const handleStop = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false); // set isPlaying to false when audio stops
    setShowGif(false);
    setShowAltGif(false); // hide the gif when audio stops
  };

return (
  <div className="app-container">
    <a href="https://twitter.com/HdKamboj" target="_blank" rel="noopener noreferrer">Made by H+a+r+d+i+k+k = 7</a>
    <h1>Thala for a reason</h1>
    {showGif && <h2>{transformedInput}</h2>}
    {showAltGif && <h2>{transformedInput}</h2>}
    <input 
      type="text" 
      value={input} 
      onChange={handleInputChange}  
      placeholder="check if it is thala or not" 
    />
    
    <div style={{ margin: '20px 0' }}>
      <Confetti active={ showGif } config={ confettiConfig } />
      {!showAltGif && !showGif && <button onClick={handleClick}>Check</button>}
      {isPlaying && <button onClick={handleStop}>Try Another</button>}
      {showAltGif && <button onClick={handleStop}>Try Another</button>}
    </div>
    {showGif && <img src={thalaImg} alt="Thala gif" />}
    {showAltGif && <img src={tryAgainImg} alt="try again gif" />}
  </div>
);
}

export default App;