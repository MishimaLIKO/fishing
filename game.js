let score = 0;
let timeLeft = 30;
let gameOver = false;
let goodZone = document.getElementById("good-zone");
let badZone = document.getElementById("bad-zone");
let pointer = document.getElementById("pointer");
let scoreText = document.getElementById("score");
let timerText = document.getElementById("timer");
let gameOverMessage = document.getElementById("gameOverMessage");
let pointerX = 300;
let speed = 2;
let direction = 1;
let animationFrame;

function resetZones() {
    let goodStart = Math.random() * 440;
    let badStart = goodStart + 60 + Math.random() * 40;
    if (badStart + 80 > 600) {
        badStart = 600 - 80;
    }
    goodZone.style.left = goodStart + "px";
    badZone.style.left = badStart + "px";
}

function updatePointer() {
    if (!gameOver) {
        pointerX += speed * direction;
        if (pointerX >= 600 || pointerX <= 0) {
            direction *= -1;
        }
        pointer.style.left = pointerX + "px";
        animationFrame = requestAnimationFrame(updatePointer);
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerText.innerText = "剩餘時間: " + timeLeft + " 秒";
    } else {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    cancelAnimationFrame(animationFrame);
    gameOverMessage.innerText = "遊戲結束！最終分數：" + score;
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !gameOver) {
        let pointerPos = pointer.offsetLeft;
        let goodStart = goodZone.offsetLeft;
        let goodEnd = goodStart + 60;
        let badStart = badZone.offsetLeft;
        let badEnd = badStart + 80;

        if (pointerPos >= goodStart && pointerPos <= goodEnd) {
            score += 10;
        } else if (pointerPos >= badStart && pointerPos <= badEnd) {
            score -= 5;
        } else {
            score -= 2;
        }
        scoreText.innerText = "分數: " + score;
        resetZones();
    }
});

resetZones();
updatePointer();
let countdown = setInterval(updateTimer, 1000);
