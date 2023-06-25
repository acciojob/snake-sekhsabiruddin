document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreBoard = document.createElement('div');
    scoreBoard.classList.add('scoreBoard');
    gameContainer.appendChild(scoreBoard);

    let pixels = [];
    let snake = [{ row: 20, col: 1 }];
    let direction = 'right';
    let food = null;
    let score = 0;

    function createPixels() {
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) {
                const pixel = document.createElement('div');
                pixel.id = `pixel${i * 40 + j + 1}`;
                pixel.classList.add('pixel');
                gameContainer.appendChild(pixel);
                pixels.push(pixel);
            }
        }
    }

    function createFood() {
        const emptyPixels = pixels.filter(pixel => !snake.find(part => part.row === getRow(pixel) && part.col === getCol(pixel)));
        const randomIndex = Math.floor(Math.random() * emptyPixels.length);
        const randomPixel = emptyPixels[randomIndex];
        randomPixel.classList.add('food');
        food = randomPixel;
    }

    function getRow(pixel) {
        return Math.floor((pixel.id.substring(5) - 1) / 40);
    }

    function getCol(pixel) {
        return (pixel.id.substring(5) - 1) % 40;
    }

    function moveSnake() {
        const head = Object.assign({}, snake[0]);
        switch (direction) {
            case 'up':
                head.row--;
                if (head.row < 0) {
                    head.row = 39;
                }
                break;
            case 'down':
                head.row++;
                if (head.row >= 40) {
                    head.row = 0;
                }
                break;
            case 'left':
                head.col--;
                if (head.col < 0) {
                    head.col = 39;
                }
                break;
            case 'right':
                head.col++;
                if (head.col >= 40) {
                    head.col = 0;
                }
                break;
        }
        if (head.row === getRow(food) && head.col === getCol(food)) {
            food.classList.remove('food');
            score++;
            scoreBoard.textContent = `Score: ${score}`;
            createFood();
        } else {
            const tail = snake.pop();
            const tailPixel = document.getElementById(`pixel${tail.row * 40 + tail.col + 1}`);
            tailPixel.classList.remove('snakeBodyPixel');
        }
        snake.unshift(head);
        const headPixel = document.getElementById(`pixel${head.row * 40 + head.col + 1}`);
        headPixel.classList.add('snakeBodyPixel');
    }

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down')
                    direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up')
                    direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right')
                    direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left')
                    direction = 'right';
                break;
        }
    });

    createPixels();
    createFood();
    const gameInterval = setInterval(moveSnake, 100);
});
