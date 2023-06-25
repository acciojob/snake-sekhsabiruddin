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
        let newHead = { ...head }; // New head position
        switch (direction) {
            case 'up':
                newHead.row--;
                if (newHead.row < 0) {
                    newHead.row = 39;
                }
                break;
            case 'down':
                newHead.row++;
                if (newHead.row >= 40) {
                    newHead.row = 0;
                }
                break;
            case 'left':
                newHead.col--;
                if (newHead.col < 0) {
                    newHead.col = 39;
                }
                break;
            case 'right':
                newHead.col++;
                if (newHead.col >= 40) {
                    newHead.col = 0;
                }
                break;
        }

        // Check if new head position overlaps with snake body
        const overlap = snake.find(part => part.row === newHead.row && part.col === newHead.col);

        if (overlap) {
            // Game over condition
            clearInterval(gameInterval);
            alert('Game Over!');
            return;
        }

        if (newHead.row === getRow(food) && newHead.col === getCol(food)) {
            food.classList.remove('food');
            score++;
            scoreBoard.textContent = `Score: ${score}`;
            createFood();
        } else {
            const tail = snake.pop();
            const tailPixel = document.getElementById(`pixel${tail.row * 40 + tail.col + 1}`);
            tailPixel.classList.remove('snakeBodyPixel');
        }

        snake.unshift(newHead);
        const headPixel = document.getElementById(`pixel${newHead.row * 40 + newHead.col + 1}`);
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
