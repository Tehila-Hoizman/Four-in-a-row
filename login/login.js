const inpPlyr1 = document.getElementById("first");
const inpPlyr2 = document.getElementById("second");

//פונקציה לתחילת המשחק המעבירה לעמוד המשחק יחד עם שמות השחקנים
function start() {
    var audio = new Audio('../sound/start.wav');
    audio.play();
    setTimeout(function () {
        location.href = `../four-in-a-row/game/game.html?name1=${inpPlyr1.value}&name2=${inpPlyr2.value}`;
    }, 1000)

}