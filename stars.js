let canvas = document.getElementById('canv');
let WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
canvas.width  = WIDTH;
canvas.height = HEIGHT;
let ORIGIN_X = WIDTH / 2,
    ORIGIN_Y = HEIGHT / 2;
let STAR_SIZE_MULTIPLIER = 0.03;
let ctx = canvas.getContext('2d');

const NUM_STARS = 40;

console.log('Started run.');

let stars = [];

function createStar() {
    var star = {};
    star.x = Math.random() * WIDTH - ORIGIN_X;
    star.y = Math.random() * HEIGHT - ORIGIN_Y;
    star.z = star.max_depth = Math.max(WIDTH, HEIGHT);

    var xcoeff = star.x > 0 ? 1 : -1;
    var ycoeff = star.y > 0 ? 1 : -1;

    if (Math.abs(star.x) > Math.abs(star.y)) {
        star.dx = 1.0;
        star.dy = Math.abs(star.y / star.x);
    } else {
        star.dx = Math.abs(star.x / star.y);
        star.dy = 1.0;
    }

    star.dx *= xcoeff;
    star.dy *= ycoeff;
    star.dz = -1;

    star.ddx = .1 * star.dx;
    star.ddy = .1 * star.dy;

    star.width = 2;
    return star;
}

function move(star) {
    star.x += star.dx;
    star.y += star.dy;
    star.z += star.dz;

    star.dx += star.ddx;
    star.dy += star.ddy;

    star.width = 2 + ((star.max_depth - star.z) * STAR_SIZE_MULTIPLIER);
}

function draw() {
    // Background
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    for (let i = 0; i < stars.length; i++) {
        move(stars[i]);
        if (stars[i].x < -ORIGIN_X || stars[i].x > ORIGIN_X ||
            stars[i].y < -ORIGIN_Y || stars[i].y > ORIGIN_Y) {
            stars[i] = createStar();
        } else {
            ctx.fillRect(
                stars[i].x + ORIGIN_X,
                stars[i].y + ORIGIN_Y,
                stars[i].width,
                stars[i].width
            );
        }
    }
}

for (let i = 0; i < NUM_STARS; i++) {
    stars.push(createStar());
}

draw();
let main_loop = setInterval(draw, 10);
