let allFrames; // get all frames array from python here
let currentFrameIndex = 0; //index of all_frames displayed

let alternatingVar = 0;
let playBtn = document.getElementById("playBtn")
let playBtnState1 = "Play";
let playBtnState2 = "Pause";
let rewindTo0Btn = document.getElementById("backToBeginningBtn")
let currentFrameCounter = document.getElementById("currentFrameCounter")
let playing = false;
let playViewer = document.getElementById("playingOrNotViewer");
let board = document.getElementById("board")
let boardSquares = board.querySelectorAll(".square")

try{
    fetch("bad_apple.json").then(async (response) =>  {
        await response.json().then((jsonValue) => {
           allFrames = jsonValue;
           MAIN();
        })
    })
}catch(e){
    console.error(e)
}

function MAIN(){
    addPieces()

    rewindTo0Btn.addEventListener("click", () => {
        currentFrameIndex = 0;
        updateFrameCounter()
    })
    playBtn.addEventListener("click", () => {
        playing = !playing;
        updatePlayBtnState();
        updatePlayViewer();
    })

    animationLoopStart()
}

function draw(){
    let currentFrame = allFrames[currentFrameIndex];

    for (let index = 0; index < boardSquares.length; index++) {
        const square = boardSquares[index];
        let elements = square.querySelectorAll("*");

        if(elements.length > 1){
            throw new Error(`Square ${index} has too many nested elements/pieces`)
        }

        let piece = elements[0];

        if(currentFrame[index] == 0 && piece.classList.contains("black")){
            piece.classList.remove("black")
            piece.classList.add("red")
        } else if(currentFrame[index] == 255 && piece.classList.contains("red")){
            piece.classList.remove("red")
            piece.classList.add("black")
        }
    }
}

function animationLoopStart(){
    // NEED TO RUN IT AT 30 FPS
    alternatingVar++;
    if(playing){
        draw()
        if(alternatingVar % 2 === 1){
            currentFrameIndex++;
        }
        updateFrameCounter();
    }
    requestAnimationFrame(animationLoopStart)
}

function addPieces(){
    color = "red"

    for (let index = 0; index < boardSquares.length; index++) {
        square = boardSquares[index];
        
        piece = document.createElement("div");
        piece.classList.add("piece")
        piece.classList.add(color)
        square.appendChild(piece)
    }
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