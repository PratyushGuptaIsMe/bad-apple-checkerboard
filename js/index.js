let allFrames; // get all frames array from python here
let currentFrameIndex = 0; //index of all_frames displayed

fetch("all_frames.json").then(async (response) =>  {
    await response.json().then((jsonValue) => {
        allFrames = jsonValue;
        MAIN();
    })
})

function MAIN(){
    animationLoop()
}

function displayFrames(){
    currentFrame = allFrames[currentFrameIndex];
    currentFrame.forEach(pixelValue => {
        // draw picture
    });
}