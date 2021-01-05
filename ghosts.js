
const directions = {
    'toBottom': {
        'dx': 0,
        'dy': 1,
        'opposite': 'toTop'
    },
    'toTop': {
        'dx': 0,
        'dy': -1,
        'opposite': 'toBottom'
    },
    'toRight': {
        'dx': 1,
        'dy': 0,
        'opposite': 'toLeft'
    },
    'toLeft': {
        'dx': -1,
        'dy': 0,
        'opposite': 'toRight'
    }
}


/**
 * Ghosts Class
 * 
 */
class Ghosts {

    constructor () {
        this.posX = null;
        this.posY = null;
        this.ghost = null;
        this.offset = 1;
        this.dir = null;
        this.dx = 0;
        this.dy = 0;
        this.row = null;
        this.column = null;
        this.inLair = true;
        this.draw();
    }

    draw () {
        const ghostHolder = document.querySelector('.ghost-holder');
        const div = document.createElement('div');
        div.classList.add('ghost');
        ghostHolder.appendChild(div);
        this.ghost = document.querySelector('.ghost');
        this.posX = this.ghost.offsetLeft;
        this.posY = this.ghost.offsetTop;
        this.row = Math.floor(this.ghost.offsetTop / 20);
        this.column = Math.floor(this.ghost.offsetLeft / 20);

        // Set initial direction
        const availableDirs = Helpers.getAvailableDirections(GRID, this.row, this.column);
        this.dir = availableDirs[Math.floor(Math.random() * availableDirs.length)];
    }

    move () {
        const oppositeDir = directions[this.dir].opposite;
        const availableDirs = Helpers.getAvailableDirections(GRID, this.row, this.column, this.dir, oppositeDir);
        
        if( this.offset === 19 ) 
        {
            this.dir = availableDirs[Math.floor(Math.random() * availableDirs.length)];
            this.offset = 0;
        }
        else 
        {
            this.offset++;
        }

        this.updatePosition(directions[this.dir].dx, directions[this.dir].dy);
        this.row = Math.floor(this.ghost.offsetTop / 20);
        this.column = Math.floor(this.ghost.offsetLeft / 20);
    }

    updatePosition(dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.posX = this.posX + this.dx;
        this.posY = this.posY + this.dy;
        this.ghost.style.left = this.posX + "px";
        this.ghost.style.top = this.posY + "px";
    }
}
