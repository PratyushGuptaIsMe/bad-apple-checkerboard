let allFrames; // get all frames array from python here
let currentFrameIndex = 0; //index of all_frames displayed

fetch("projects/all_frames.json").then(async (response) =>  {
    await response.json().then((jsonValue) => {
        allFrames = jsonValue;
        console.log(allFrames)
        MAIN();
    })
})

let board = document.getElementById("board")
let boardSquares = board.querySelectorAll(".square")
let allCurrentPieces = [];

function MAIN(){
    setInterval(() => {
        draw()
        currentFrameIndex++;
    }, 70) //14FPS
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