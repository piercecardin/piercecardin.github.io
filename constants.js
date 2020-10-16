//------------
//System Values
//------------
var STAGE_WIDTH = 300,
    STAGE_HEIGHT = 200,
    TIME_PER_FRAME = 33, //this equates to 30 fps
    GAME_FONTS = "bold 20px sans-serif";

var PATH_CHAR = "spritesheet.png"; //spritesheet location

var CHAR_WIDTH = 16, //For spritesheet calculation
    CHAR_HEIGHT = 22,
    CHAR_START_X = 200, //start pos
    CHAR_START_Y = 200,
    CHAR_SPEED = 5, //speed
    CHAR_RUNSPEED = 7,
    IMAGE_START_X = 0,
    IMAGE_START_NORTH_Y = 0, //All of these denote places in the sprite system
    IMAGE_START_EAST_Y = 22,
    IMAGE_START_SOUTH_Y = 44,
    IMAGE_START_WEST_Y = 66,
    SHEET_WIDTH = 64; //full sheet size

var TEXT_PRELOADING = "Loading ...",
    TEXT_PRELOADING_X = 200,
    TEXT_PRELOADING_Y = 200;