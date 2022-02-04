var character = document.querySelector(".character");
var map = document.querySelector(".map");
var object = document.getElementById('waterbottle')

//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

//Sound Effects
var correct = new Audio("./assets/sound/education-game-correct.wav");
var wrong = new Audio("./assets/sound/education-game-wrong.wav");

//Timer
var score = 0;
var timer = document.getElementById('countdown')
let timesecond = 59;

timer.innerHTML = `00:${timesecond}`;

displayTime(timesecond);

const countDown = setInterval(() => {
    timesecond--;
    displayTime(timesecond);
    if (timesecond == 0 || timesecond < 1) {
        endCount();
        clearInterval(countDown);
    }
}, 1000);
function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timer.innerHTML = `
    ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
    `;
}
function endCount() {
    timer.innerHTML = "Time out";
}

//Score
var score = 0;

//Restart Button
var restartb = document.getElementById('restart')

//Recycle Button
var recycle = document.getElementById('recycle')

const placeCharacter = () => {

    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) { x += speed; }
        if (held_direction === directions.left) { x -= speed; }
        if (held_direction === directions.down) { y += speed; }
        if (held_direction === directions.up) { y -= speed; }
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true" : "false");

    //Limits (gives the illusion of walls)
    var leftLimit = -8;
    var rightLimit = (16 * 11) + 8;
    var topLimit = -8 + 32;
    var bottomLimit = (16 * 7);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }

    //Objects Limits
    if (x > 15 && x < 42 && y > 50 && y < 72) 
    {
        x = 15; 
        y = 60;
    }
    if (x > 125 && x < 155 && y > 35 && y < 55) {x = 125; y = 45;}
    if (x > 110 && x < 130 && y > 80 && y < 110) {x = 110; y = 95;}

    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;

    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
}

recycle.addEventListener("click", function() {
    if (x == 15 && y == 60 || (x == 110 && y == 95)){
        score +=1
        document.getElementById('score').innerHTML = `Score: ${score}`;
        correct.play();
    }
    else if (x == 125 && y == 45){
        score -=1
        document.getElementById('score').innerHTML = `Score: ${score}`;
        wrong.play();
    }
  });

//Restart Game
restartb.addEventListener("click", restartGame);
function restartGame() {
    timer.innerHTML = `00:${timesecond}`;
    timesecond = 59;
    score = 0;
    document.getElementById('score').innerHTML = `Score: ${score}`;
    x = 90;
    y = 34;
}

//Set up the game loop
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
if(timer.innerHTML == "Time out" || score == 5)
{
    restartGame();
}
else{
    step(); //kick off the first step!
}



/* Direction key state */
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}
const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
}
document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1)
    }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
    document.querySelectorAll(".dpad-button").forEach(d => {
        d.classList.remove("pressed")
    })
}
document.body.addEventListener("mousedown", () => {
    console.log('mouse is down')
    isPressed = true;
})
document.body.addEventListener("mouseup", () => {
    console.log('mouse is up')
    isPressed = false;
    held_directions = [];
    removePressedAll();
})
const handleDpadPress = (direction, click) => {
    if (click) {
        isPressed = true;
    }
    held_directions = (isPressed) ? [direction] : []

    if (isPressed) {
        removePressedAll();
        document.querySelector(".dpad-" + direction).classList.add("pressed");
    }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));