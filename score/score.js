//הצהרה על משתנים
const details = document.querySelector('.details');//table
let currentWinners = JSON.parse(localStorage.getItem('winners'));//כל המנצחים השמורים בלוקאל סטוראג'
let game;

//יצירת הטבלה
for (let i = 0; (i < currentWinners.length) && (i < 10); i++) {
    game = currentWinners[i];//מנצח נוכחי
    let tr = document.createElement("tr");//יצירת שורה
    let td1 = document.createElement("td");//יצירת תא בשורה
    let td2 = document.createElement("td");//יצירת תא בשורה
    let td3 = document.createElement("td");//יצירת תא בשורה
    let td4 = document.createElement("td");//יצירת תא בשורה
    let td5 = document.createElement("td");//יצירת תא בשורה

    td1.textContent = game.pink;
    tr.appendChild(td1);
    td2.textContent = game.orange;
    tr.appendChild(td2);
    td3.textContent = game.winner;
    tr.appendChild(td3);
    td4.textContent = game.time;
    tr.appendChild(td4);
    td5.textContent = game.steps;
    tr.appendChild(td5);
    details.appendChild(tr);
}

//לחיצה על כפתור לוגין
function btnLogin() {
    var audio = new Audio('../sound/click.wav');
    audio.play();
    setTimeout(function () { location.href = `../login/login.html` }, 100)
}