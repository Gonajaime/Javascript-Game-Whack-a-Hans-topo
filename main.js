const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const holes = document.querySelectorAll(".hole");

let score = 0;
let timeUp = false;
let lastHole;

function ramdomTime(min, max){
    return Math.round(Math.random() * (max - min) + min);
}


function ramdomHole(holes) {
    const randomHans = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHans]
    if (hole === lastHole) {
        console.log("es el mismo hueco")
        return ramdomHole(holes);
        
    } lastHole = hole;
    return hole;

}


function peep(){
    const time = ramdomTime(200,1000);
    const topo = ramdomHole(holes);
    topo.classList.add("up");
    setTimeout(() => {
        topo.classList.remove("up");
        if(!timeUp) peep();
        }, time);
     }



function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000)
 //muestra topos aleatoriamente durante 15 segundos
}

function wack (e){
    //para que no cuente un click simulado desde js y solo recoja el del usuario.
    if(!e.isTrusted) return; 
    this.classList.remove("up");
    scoreBoard.textContent = score;
    score++;
}

moles.forEach(topo => topo.addEventListener("click", wack));

