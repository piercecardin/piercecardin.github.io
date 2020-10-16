//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "lightGrey";
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

var gameloop, sX, sY,
    charX, charY,
    isRunning, isMoving,
    north, west, south, east,
    mHp, hp, mSp, sp, coin,
    runCost, runReplenish,
    level, exp, upCost,
    spawnRate, maxEnemies, enemySpeed,
    eX, eY,
    moveKeys;

function preloading() {
    if (charImage.ready) {
        clearInterval(preloader);

        //Initialise game

        //--------------------
        //-----Player---------
        //--------------------
        //Movement flags
        isRunning = false;
        isMoving = false;
        south,
        north,
        west,
        east = false;

        //Stats
        mHp = 100;
        mSp = 100;
        hp = mHp;
        sp = mSp;
        coin = 0;

        //Also stats, but used to calculate other stuff
        runCost = 0.5;
        runReplenish = 1.0;
        
        //Morre calc stats, used to calc the calc stats
        level = 1;
        exp = 0;
        upCost = 100;

        /////////////////////////

        //------------------
        //---enemy stuff----
        //------------------
        spawnRate = 10;
        maxEnemies = 5;
        enemySpeed = 4;
        eX = 100;
        eY = 100;

        gameloop = setInterval(update, TIME_PER_FRAME);
        document.addEventListener("keydown", keyPressedHandler);
        document.addEventListener("keyup", keyUpHandler);
    }
}

//------------
//Key Handlers
//------------
function keyPressedHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    if (keyPressed == "W") {
        north = true;
    }
    if (keyPressed == "A") {
        west = true;
    }
    if (keyPressed == "S") {
        south = true
    }
    if (keyPressed == "D") {
        east = true;
    }
    if (keyPressed == ["W", "A", "S", "D"]){
        isMoving = true;
    }
}
function keyUpHandler(event) {
    var keyReleased = String.fromCharCode(event.keyCode);

    if (keyReleased == "W") {
        north = false;
    }
    if (keyReleased == "A") {
        west = false;
    }
    if (keyReleased == "S") {
        south = false;
    }
    if (keyReleased == "D") {
        east = false;
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
    ctx.fillRect(0, 0, stage.width, stage.height);
    ctx.fillStyle = "lightGrey";

    //ai
    eX += Math.cos(eX + charX) * enemySpeed;
    eY += Math.sin(eY + charY) * enemySpeed;
    // Animation handler
    //movement
    if (north == true) {
        if ((isRunning) && (sp > 0)) {
            charY -= CHAR_RUNSPEED;
            sp -= runCost;
        } else {
            charY -= CHAR_SPEED;
            //sp += runReplenish;
        }
        sY = IMAGE_START_NORTH_Y;
    }
    if (west == true) {
        if ((isRunning) && (sp > 0)) {
            charX -= CHAR_RUNSPEED;
            sp -= runCost;
        } else {
            charX -= CHAR_SPEED;
            //sp += runReplenish;
        }
        sY = IMAGE_START_WEST_Y;
    }
    if (south == true) {
        if ((isRunning) && (sp > 0)) {
            charY += CHAR_RUNSPEED;
            sp -= runCost;
        } else {
            charY += CHAR_SPEED;
            //sp += runReplenish;
        }
        sY = IMAGE_START_SOUTH_Y;
    }
    if (east == true) {
        if ((isRunning) && (sp > 0)) {
            charX += CHAR_RUNSPEED;
            sp -= runCost;
        } else {
            charX += CHAR_SPEED;
            //sp += runReplenish;
        }
        sY = IMAGE_START_EAST_Y;
    }

    if (isMoving == true) {
        // Actual animation handler
        sX += CHAR_WIDTH;

        if (sX >= SHEET_WIDTH) {
            sX = 0;
        }
    }
    //Draw Player
    ctx.drawImage(charImage, sX, sY, CHAR_WIDTH, CHAR_HEIGHT,
        charX, charY, CHAR_WIDTH, CHAR_HEIGHT);
    
    //Draw Enemies
    ctx.drawImage(charImage, 1, 1, CHAR_WIDTH, CHAR_HEIGHT,
        eX, eY, CHAR_WIDTH, CHAR_HEIGHT);
}