
let allFrames; // get all frames array from python here
let currentFrameIndex = 0; //index of all_frames displayed

fetch("all_frames.json").then(async (response) =>  {
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
        removeCheckers()
        drawCheckers()
        currentFrameIndex++;
    }, 200)
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
        p = document.createElement("div")
        p.classList.add("piece")
        p.classList.add(color)
        square.appendChild(p)
        allCurrentPieces.push(p)
    }
}

function removeCheckers(){
    allCurrentPieces.forEach(element => {
        element.remove()
    });
}