//הצהרה על אלמנטים
const gameBoard = document.querySelector(".game-board");
const circlesBoard = document.querySelector(".circles-board");
const arrows = document.querySelector(".arrows");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const timer = document.querySelector(".timer");
const countSteps = document.getElementById("count-steps");
const winPlayer = document.getElementById("win-player");
const time = document.getElementById("time");
const steps = document.getElementById("steps");
const message = document.querySelector(".modal");
const messageFail = document.querySelector(".modal2");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const modalWin = document.querySelector(".modal-content.animate");
const countStart = document.querySelector(".countStart");
const countStartTitle = document.querySelector("#title");
const playMusic = document.querySelector("#playMusic");
let currentPlayer = 1;
let colors = ["", "#ff0084", "#ffb700"];
let counterS = 0;
let w;
let winner = 0;
var audioStart = new Audio('sound/bg-music.wav');
var plyr1 = "player1";
var plyr2 = "player2";
let second = 0;
let minutes = 0;
const inpPlyr1 = document.getElementById("first");
const inpPlyr2 = document.getElementById("second");

//הפעלת הטיימר
let s = setInterval(calcTimer, 1000);

//התחלת המשחק
newGame();

//מטריצה לחישוב צעדי המשתתפים
let calcArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]];

//מערך מונים לספירת מספר עיגולים בעמודה
let counter = [0, 0, 0, 0, 0, 0, 0];

//יצירת לוח העיגולים
function createCircles() {
    //יצירת 6 שורות
    for (let i = 6; i >= 1; i--) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", `row-${i}`);
        circlesBoard.appendChild(row);
        //יצירת 7 עמודות בשורה
        for (let j = 1; j <= 7; j++) {
            let circle = document.createElement("div");
            circle.setAttribute("class", "circle");
            circle.setAttribute("id", `row-${i}-circle-${j}`);
            circle.style.margin = "2px";
            circle.style.marginLeft = "10px";
            circle.style.marginRight = "10px";
            circle.style.borderRadius = "100px";
            circle.style.backgroundColor = "white";
            circle.style.boxSizing = "border-box";
            circle.style.display = "inline-block";
            row.appendChild(circle);
        }
    }
}

//יצירת החיצים
function createArrows() {
    //שורה של חיצים
    let rowArrows = document.createElement("div");
    rowArrows.setAttribute("class", "row-arrows");
    rowArrows.setAttribute("id", "row-arrows");
    arrows.appendChild(rowArrows);

    //יצירת 7 חיצים
    for (let j = 1; j <= 7; j++) {

        //קונטיינר מעטפת לכל חץ
        let arrowContainer = document.createElement("div");
        arrowContainer.setAttribute("class", "arrow-container");
        arrowContainer.setAttribute("id", `arrowContainer-${j}`);
        arrowContainer.style.margin = "2px";
        arrowContainer.style.marginLeft = "10px";
        arrowContainer.style.marginRight = "10px";
        arrowContainer.style.backgroundColor = "white";
        arrowContainer.style.display = "inline-block";
        arrowContainer.style.textAlign = "center";
        rowArrows.appendChild(arrowContainer);

        //חץ
        let arrow = document.createElement("img");
        arrow.setAttribute("class", "arrow");
        arrow.setAttribute("id", `arrow-${j}`);
        arrow.setAttribute("src", "../images/down.gif");
        arrow.style.display = "inline-block";
        arrowContainer.appendChild(arrow);
        arrow.addEventListener("click", () => { clickOnArrow(j) });

    }
}

//בלחיצה על חץ
function clickOnArrow(j) {
    //בדיקה אם נותר מקום בטור
    if (counter[j - 1] < 6) {
        //עדכון העיגול לצבע
        console.log(`row-${counter[j - 1] + 1}-circle-${j}`);
        document.getElementById(`row-${counter[j - 1] + 1}-circle-${j}`).style.backgroundColor = `${colors[currentPlayer]}`;
        calcArray[counter[j - 1]][j - 1] = currentPlayer;
        counter[j - 1]++;

        nextPlayer();
    }
}

//תור הבא
function nextPlayer() {
    var audio = new Audio('../sound/ball.wav');
    audio.play();
    if (currentPlayer == 1) {
        currentPlayer = 2;
        yellow.style.border = "3px solid #8df912"
        red.style.border = "none"

    }
    else {
        currentPlayer = 1;
        red.style.border = "3px solid #8df912"
        yellow.style.border = "none"

    }
    //בדיקה האם ישנו מנצח
    let isWin = checkIfWin();
    let boardFull = true;
    //אם אין מנצח בודק האם נותרו עיגולים ריקים, אם לא מדפיס הודעת כישלון
    if (!isWin) {
        for (let i = 0; i < counter.length; i++) {
            if (counter[i] != 6)
                boardFull = false;
        }
        if (boardFull)
            fail();
    }
    counterS++;
    countSteps.textContent = `${parseInt(counterS / 2)} steps`
}

//בדיקה אם קיים מנצח
function checkIfWin() {
    let win = false;
    winner = 0;
    //בודק אם יש עמודה
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3 && win == false; j++) {
            if (calcArray[j][i] != 0 && calcArray[j][i] == calcArray[j + 1][i] && calcArray[j][i] == calcArray[j + 2][i] && calcArray[j][i] == calcArray[j + 3][i]) {
                win = true;
                winner = calcArray[j][i];
                document.getElementById(`row-${j + 1}-circle-${i + 1}`).style.border = "5px solid #29ee29";
                document.getElementById(`row-${j + 2}-circle-${i + 1}`).style.border = "5px solid #29ee29";
                document.getElementById(`row-${j + 3}-circle-${i + 1}`).style.border = "5px solid #29ee29";
                document.getElementById(`row-${j + 4}-circle-${i + 1}`).style.border = "5px solid #29ee29";
            }
        }

    }

    //בודק אם יש שורה
    if (!win) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (calcArray[i][j] != 0 && calcArray[i][j] == calcArray[i][j + 1] && calcArray[i][j] == calcArray[i][j + 2] && calcArray[i][j] == calcArray[i][j + 3]) {
                    win = true;
                    winner = calcArray[i][j];
                    document.getElementById(`row-${i + 1}-circle-${j + 1}`).style.border = "5px solid #29ee29";
                    document.getElementById(`row-${i + 1}-circle-${j + 2}`).style.border = "5px solid #29ee29";
                    document.getElementById(`row-${i + 1}-circle-${j + 3}`).style.border = "5px solid #29ee29";
                    document.getElementById(`row-${i + 1}-circle-${j + 4}`).style.border = "5px solid #29ee29";
                }
            }
        }
    }

    //בודק אלכסון משמאל לימין
    if (!win) {
        if (!win) {
            for (let i = 3; i < 6; i++) {
                for (let j = 0; j < 4; j++) {
                    if (calcArray[i][j] != 0 && calcArray[i][j] == calcArray[i - 1][j + 1] && calcArray[i][j] == calcArray[i - 2][j + 2] && calcArray[i][j] == calcArray[i - 3][j + 3]) {
                        win = true;
                        winner = calcArray[i][j];
                        document.getElementById(`row-${i + 1}-circle-${j + 1}`).style.border = "5px solid #29ee29";
                        document.getElementById(`row-${i}-circle-${j + 2}`).style.border = "5px solid #29ee29";
                        document.getElementById(`row-${i - 1}-circle-${j + 3}`).style.border = "5px solid #29ee29";
                        document.getElementById(`row-${i - 2}-circle-${j + 4}`).style.border = "5px solid #29ee29";
                    }
                }
            }
        }
    }

    //בודק אלכסון מימין לשמאל
    if (!win) {
        if (!win) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 4; j++) {
                    if (calcArray[i][j] != 0 && calcArray[i][j] == calcArray[i + 1][j + 1] && calcArray[i][j] == calcArray[i + 2][j + 2] && calcArray[i][j] == calcArray[i + 3][j + 3]) {
                        win = true;
                        winner = calcArray[i][j];
                        document.getElementById(`row-${i + 1}-circle-${j + 1}`).style.border = "5px solid #29ee29";
                        document.getElementById(`row-${i + 2}-circle-${j + 2}`).style.border = "5px solid #29ee29";
                        document.getElementById(`row-${i + 3}-circle-${j + 3}`).style.border = "5px solid #29ee29";
                        document.getElementById(`row-${i + 4}-circle-${j + 4}`).style.border = "5px solid #29ee29";
                    }
                }
            }
        }
    }
    if (win) {
        setTimeout(winMessage, 1000)
        var audio = new Audio('../sound/win2.wav');
        audio.play();
    };
    return win;
}

//משחק חדש
function newGame() {
    message.style.display = "none";
    //יצירת חיצים
    createArrows();
    //יצירת עיגולים
    createCircles();

    currentPlayer = 1;
    counterS = 0;
    red.style.border = "3px solid #8df912"
    yellow.style.border = "none"

    // שמירת שמות שחקנים
    var url_string = window.location.href;
    var url = new URL(url_string);
    if (url.searchParams.get("name1") != null) {
        if (url.searchParams.get("name1") != "")
            plyr1 = url.searchParams.get("name1")
        if (url.searchParams.get("name2") != "")
            plyr2 = url.searchParams.get("name2");
    };

    p1.textContent = plyr1;
    p2.textContent = plyr2;

    //איתחול הלוקל סטוראג' במידת הצורך
    if (localStorage.getItem('winners') == null)
        localStorage.setItem('winners', JSON.stringify([]));

}

//פונקציה לחישוב הטיימר
function calcTimer() {


    second++;
    if (second == 60) {
        minutes++;
        second = 0;
    }
    if (minutes < 10) {
        if (second < 10) {
            timer.textContent = `0${minutes}:0${second}`;
        } else {
            timer.textContent = `0${minutes}:${second}`;
        }
    } else {
        if (second < 10) {
            timer.textContent = `${minutes}:0${second}`;
        } else {
            timer.textContent = `${minutes}:${second}`;
        }
    }
}

//הודעת ניצחון
function winMessage() {

    //הפעלת צליל ניצחון
    audioStart.pause();
    message.style.display = "block";
    var audio = new Audio('../sound/win.wav');
    audio.play();

    //איפוס הטיימר
    clearTimeout(s);

    //עידכון מנצח
    let winp;
    if (winner == 1) {
        winp = plyr1;
        modalWin.style.backgroundColor = "rgb(255, 0, 132)";
    }
    else {
        winp = plyr2;
        modalWin.style.backgroundColor = "#FFC107";

    }
    winPlayer.textContent = `${winp}`;
    time.textContent = `time: ${timer.textContent} `;
    steps.textContent = `steps: ${countSteps.textContent}`;

    //יצירת אוביקט לשמירת פרטי משחק
    let object1 = {
        pink: plyr1,
        orange: plyr2,
        winner: winp,
        time: timer.textContent,
        steps: countSteps.textContent,
    };

    //הוספת המשחק ללוקל סטוראג'
    let currentWinners = JSON.parse(localStorage.getItem('winners'));
    console.log(currentWinners, ' currentWinners ');
    currentWinners.unshift(object1);
    localStorage.setItem('winners', JSON.stringify(currentWinners))
}

//הודעת כישלון
function fail() {
    messageFail.style.display = "block";
    var audio = new Audio('../sound/fail.wav');
    audio.play();
    clearTimeout(s);
}

//לחיצה על כפתור ניו גיים
function btnNewGame() {
    var audio = new Audio('../sound/click.wav');
    audio.play();
    setTimeout(function () { window.location.reload() }, 100)
}

//לחיצה על כפתור לוגין
function btnLogin() {
    var audio = new Audio('../sound/click.wav');
    audio.play();
    setTimeout(function () { location.href = `../index.html` }, 100)
}

//לחיצה על כפתור דיטייל
function btnDetails() {
    var audio = new Audio('../sound/click.wav');
    audio.play();
    setTimeout(function () { location.href = `../score/score.html` }, 100)
}

