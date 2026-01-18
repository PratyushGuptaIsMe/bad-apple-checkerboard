let fps = 30;

let allFrames; // get all frames array from python here
let currentFrameIndex = 0; // index of all_frames displayed
let player;
let videoPlayer;

let playBtn = document.getElementById("playBtn")
let playBtnState1 = "Play";
let playBtnState2 = "Pause";
let rewindTo0Btn = document.getElementById("backToBeginningBtn")
let currentFrameCounter = document.getElementById("currentFrameCounter")
let playing = false;
let playViewer = document.getElementById("playingOrNotViewer");
let board = document.getElementById("board")
let boardSquares = board.querySelectorAll(".square")

let animation = {
    fps: fps,
    fpsInterval: 1000 / fps,
    deltatime: 0,
    timer: 0,
    lasttimestamp: 0,
}


function MAIN(){
    addPieces()
    mountYoutubePlayer()

    rewindTo0Btn.addEventListener("click", () => {
        currentFrameIndex = 0;
        playing = false;
        draw()
        rewindVideo();
        updateFrameCounter()
    })
    playBtn.addEventListener("click", () => {
        playing = !playing;
        updatePlayBtnState();
        updatePlayViewer();
        updateVideoPlayer();
    })

    requestAnimationFrame(animationLoopStart);
}

function animationLoopStart(t){
    animation.deltatime = t-animation.lasttimestamp
    animation.lasttimestamp=t
    if(animation.timer>=animation.fpsInterval){
        animation.timer-=animation.fpsInterval;
        if(playing){
            draw()
            incrementFrames()
            updateFrameCounter();
        }
    }
    animation.timer+=animation.deltatime

    requestAnimationFrame(animationLoopStart)
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

function addPieces(){
    let color = "red"

    for (let index = 0; index < boardSquares.length; index++) {
        let square = boardSquares[index];
        
        let piece = document.createElement("div");
        piece.classList.add("piece")
        piece.classList.add(color)
        square.appendChild(piece)
    }
}


function incrementFrames(){
    currentFrameIndex++;
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


function rewindVideo(){
    videoPlayer.seekTo(0);
}

function updateVideoPlayer(){
    if(playing){
        videoPlayer.playVideo()
    }else if(!playing){
        videoPlayer.pauseVideo();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("yt-video", {
        width: 560,
        height: 315,
        videoId: "FtutLA63Cp8",
        playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            origin: window.location.origin,
        },
        events: {
            onReady: onPlayerMounted,
            onError: (e) => console.error("Youtube ERROR: ", e.data)
        }
    });
}

function onPlayerMounted(event){
    videoPlayer = event.target;
    console.log("Youtube player mounted")
}

function mountYoutubePlayer(){
    if(YT.Player){
        onYouTubeIframeAPIReady()
    }else{
        console.log("Youtube player still loading...")
    }
}

fetch("bad_apple.json").then(async (response) =>  {
    await response.json().then((jsonValue) => {
       allFrames = jsonValue;
       MAIN();
    })
}).catch((error) => {
    console.error("Fetch error: " + error)
})