let instruct = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
let body = document.querySelector("body");
let gameseq=[];
let Userseq = [];
let level = 0;
let scores = [];
let gamestart = false;
let highest =0;
let maxscore = document.querySelector("#score");

document.addEventListener('keypress', function() {
    if(gamestart==false) {
        console.log("game has started");
        gamestart = true;
        levelUp();
    }
    
})

for(btn of btns) {
    btn.addEventListener('click', btnpress);
}


function levelUp() {
    Userseq = [];
    level++;
    instruct.innerText = `Level ${level}`
    let randno= Math.floor(Math.random()*4);
    let currbtn = btns[randno];
    let btnclass = currbtn.classList[1];
    gameseq.push(btnclass);
    btnblink(currbtn); 
    
}

function btnblink (currbtn) {
    
    currbtn.classList.add("flash");
    setTimeout( ()=> {
        currbtn.classList.remove("flash");
        ;
    },100);
}

function btnpress() {
    // console.log("button was pressed");

    let btn = this.classList[1];
    Userseq.push(btn);
    btnblink(this);
    // console.log(Userseq);

    Match((Userseq.length)-1);
        
    }
    

function Match(indx) {
   
    if(gameseq[indx] === Userseq[indx]) {
        if (gameseq.length == Userseq.length) {
            setTimeout(()=> {
                levelUp();
            },300);
        }
       
    }
    else {
        body.style.backgroundColor = "red";
        setTimeout( ()=> {
            body.style.backgroundColor= "white";
        }, 300);
        
        instruct.innerHTML = `Game over! Your score is <b>${level}</b> Press any key to start again`
        scores.push(level);
        highestscore();

        reset();
    

    }
 
}

function reset() {
    gamestart = false;
    level  = 0;
    gameseq = [];
    Userseq = [];
}   

function highestscore() {
    
    for(n of scores ) {
        if(highest<n) {
            highest = n;
        }
    }
    maxscore.innerHTML = `Highest Score : ${highest}`;

}
