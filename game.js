//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;

//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

function setAssetReady() {
    this.ready = true;
}

//Display Preloading in canvas (ie loading screen)
ctx.fillRect(0, 0, stage.width, stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, sX, sY, charX, charY, isMoving, isRunning,
    mHp, hp, mSp, sp,
    runCost, runReplenish,
    keyPressed, keyReleased,
    moveKeys;

function preloading() {
    if (charImage.ready) {
        clearInterval(preloader);

        //Initialise game
        facing = "S"; //N = North, E = East, S = South, W = West
        isMoving = false;
        isRunning = false;
        mHp = 100;
        mSp = 100;
        hp = mHp;
        sp = mSp;
        runCost = 0.5;
        runReplenish = 1.0;
        moveKeys = ["W", "A", "S", "D"];

        gameloop = setInterval(update, TIME_PER_FRAME);
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
    }
}

//------------
//Key Handlers
//------------
function keyDownHandler(event) {
    keyPressed = String.fromCharCode(event.keyCode);

    if (keyPressed == "W") {
        isMoving = true;
        facing = "N";
    } else if (keyPressed == "D") {
        isMoving = true;
        facing = "E";
    } else if (keyPressed == "S") {
        isMoving = true;
        facing = "S";
    } else if (keyPressed == "A") {
        isMoving = true;
        facing = "W";
    }

    /* Depracated
    //This is meant only for facing vars.
    switch (keyPressed) {
        case "W":
            facing = "N";
            break;
        case "D":
            facing = "E";
            break;
        case "S":
            facing = "S";
            break;
        case "A":
            facing = "W";
            break;
        default:
            facing = "S";
            isMoving = false;
            //isRunning = false;
            break;
    }
    */
}

//Depracated
/*
function keyUpHandler(event) {
  var keyPressed = String.fromCharCode(event.keyCode);

  if ((keyPressed == "W") || (keyPressed == "A") ||
      (keyPressed == "S") || (keyPressed == "D")) {
    isMoving = false;
  } else if (keyPressed == "SHIFT") {
    isRunning = false;
  }

}
*/

// New
function keyUpHandler(event) {
    keyReleased = String.fromCharCode(event.keyCode);

    if (keyReleased == "W") {
        if (keyPressed != "W" ||
            keyPressed != "A" ||
            keyPressed != "S" ||
            keyPressed != "D") {
            isMoving = false;
        }
    }
    if (keyReleased == "A") {
        if (keyPressed != "W" ||
            keyPressed != "A" ||
            keyPressed != "S" ||
            keyPressed != "D") {
            isMoving = false;
        }
    }
    if (keyReleased == "S") {
        if (keyPressed != "W" ||
            keyPressed != "A" ||
            keyPressed != "S" ||
            keyPressed != "D") {
            isMoving = false;
        }
    }
    if (keyReleased == "D") {
        if (keyPressed != "W" ||
            keyPressed != "A" ||
            keyPressed != "S" ||
            keyPressed != "D") {
            isMoving = false;
        }
    }
}

//------------
//Game Loop
//------------
charX = CHAR_START_X;
charY = CHAR_START_Y;

sX = IMAGE_START_X;
sY = IMAGE_START_EAST_Y;

function update() {
    //Clear Canvas
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, stage.width, stage.height);

    // Animation handler
    if (isMoving) {

        // Sets the animation marker for image based on player
        // Direction, and also moves the player based on this.
        // This also handles running
        //todo Un-constantify speed
        switch (facing) {
            case "N":
                if ((isRunning) && (sp > 0)) {
                    charY -= CHAR_RUNSPEED;
                    sp -= runCost;
                } else {
                    charY -= CHAR_SPEED;
                    //sp += runReplenish;
                }
                sY = IMAGE_START_NORTH_Y;
                break;

            case "E":
                if ((isRunning) && (sp > 0)) {
                    charX += CHAR_RUNSPEED;
                    sp -= runCost;
                } else {
                    charX += CHAR_SPEED;
                    //sp += runReplenish;
                }
                sY = IMAGE_START_EAST_Y;
                break;

            case "S":

                if ((isRunning) && (sp > 0)) {
                    charY += CHAR_RUNSPEED;
                    sp -= runCost;
                } else {
                    charY += CHAR_SPEED;
                    //sp += runReplenish;
                }
                sY = IMAGE_START_SOUTH_Y;
                break;

            case "W":

                if ((isRunning) && (sp > 0)) {
                    charX -= CHAR_RUNSPEED;
                    sp -= runCost;
                } else {
                    charX -= CHAR_SPEED;
                    //sp += runReplenish;
                }
                sY = IMAGE_START_WEST_Y;
                break;
        }

        // Actual animation handler
        sX += CHAR_WIDTH;

        if (sX >= SHEET_WIDTH) {
            sX = 0;
        }
    } else {
        sX = 0;
    }
    //Draw Image
    ctx.drawImage(charImage, sX, sY, CHAR_WIDTH, CHAR_HEIGHT,
        charX, charY, CHAR_WIDTH, CHAR_HEIGHT);
}