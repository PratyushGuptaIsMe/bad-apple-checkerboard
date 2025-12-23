let allFrames; // get all frames array from python here
let currentFrameIndex = 0; //index of all_frames displayed

let playBtn = document.getElementById("playBtn")
let playBtnState1 = "Play";
let playBtnState2 = "Pause";
let rewindTo0Btn = document.getElementById("backToBeginningBtn")
let currentFrameCounter = document.getElementById("currentFrameCounter")
let playing = false;
let playViewer = document.getElementById("playingOrNotViewer");

try{
    fetch("all_frames.json").then(async (response) =>  {
        await response.json().then((jsonValue) => {
           allFrames = jsonValue;
           MAIN();
        })
    })
}catch(e){
    console.error(e)
}


let board = document.getElementById("board")
let boardSquares = board.querySelectorAll(".square")
let allCurrentPieces = [];

function MAIN(){
    rewindTo0Btn.addEventListener("click", () => {
        currentFrameIndex = 0;
        updateFrameCounter()
    })
    playBtn.addEventListener("click", () => {
        playing = !playing;
        updatePlayBtnState();
        updatePlayViewer();
    })
    setInterval(() => {
        draw();
        if(playing){
            currentFrameIndex++;
            updateFrameCounter();
        }
    }, 70) // 14FPS
}

function updatePlayViewer(){
    if(playing === false){
        playViewer.textContent = "Not Playing";
    }else if(playing === true){
        playViewer.textContent = "Playing";
    }
}

function updateFrameCounter(){
    currentFrameCounter.textContent = "Current frame: " + currentFrameIndex;
}

function updatePlayBtnState(){
    if(playBtn.textContent == playBtnState1){
        playBtn.textContent = playBtnState2;
    }else if(playBtn.textContent == playBtnState2){
        playBtn.textContent = playBtnState1;
    }  
}

function draw(){
    removeCheckers()
    drawCheckers()
}

function drawCheckers(){
    currentFrame = allFrames[currentFrameIndex];
    let color;
    for (let index = 0; index < boardSquares.length; index++) {
        const square = boardSquares[index];
        if(currentFrame[index] == 0){
            color = "red";
        }
        else if(currentFrame[index] == 255){
            color = "black"
        }
        piece = document.createElement("div")
        piece.classList.add("piece")
        piece.classList.add(color)
        square.appendChild(piece)
        allCurrentPieces.push(piece)
    }
}

function removeCheckers(){
    allCurrentPieces.forEach(element => {
        element.remove()
    });
}