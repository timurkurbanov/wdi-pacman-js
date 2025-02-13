// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};
const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
const ghosts = ['inky', 'blinky', 'pinky', 'clyde'];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}       powerPellets: ${powerPellets}`);
}


function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pettets');
  console.log(`(1) Eat Inky (${inky.edible ? "edible" : "inedible"})`);
  console.log(`(2) Eat Blinky (${blinky.edible ? "edible" : "inedible"})`);
  console.log(`(3) Eat Pinky (${pinky.edible ? "edible" : "inedible"})`);
  console.log(`(4) Eat Clyde (${clyde.edible ? "edible" : "inedible"})`);
  console.log(`(q) Quit`);
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

// function eatGhost(ghost) {
//   if (ghost['edible']) {
//     if (ghostsEaten < 4) {
//       ghostsEaten +=1;
//     }
//   }
// }

function eatGhost(ghost) {
  if (!ghost.edible) {
    lives--;
    console.log(`Name of ghost: ${ghost.name}     Color of ghost: ${ghost.colour}`);
    gameOver();
  }
  else {
    console.log(`${ghost.character}!`);
    score += 200;
    ghost.edible = false;
  }
}

function isEdible(ghost) {
  if (ghost.edible) {
    
  }
}

function gameOver() {
  if (lives < 0) {
    process.exit();
  }
}

function eatPowerPellet() {
  if (powerPellets > 0) {
    score += 50;
    for (i=0; i<4; i++) {
      ghosts[i].edible = true;
    }
    powerPellets--;
  }
  else {
    console.log('No Power-Pallets left!')
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
      break;
    // case '2':
    //   eatDot();
    //   break;
    // case '3':
    //   eatDot();
    //   break;
    // case '4':
    //   eatDot();
    //   break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
