//letters
const letters= "abcdefghijklmnopqrstuvwxyz";

//array
let newletters=Array.from(letters);
//console.log(newletters);


//select letters container
let lettterscontainer=document.querySelector(".letters");

newletters.forEach(letter=>{

//create span to letter
let span=document.createElement("span");

//create letter
let theletter=document.createTextNode(letter);

//create letter inside span
span.appendChild(theletter);

//create classto span
span.className='letter-box';

//create span inside letterscontainer
lettterscontainer.appendChild(span);

});

let words={
    people:["Hamdy","lolo","baba","mama","Ahmed"],
    country:["Egypt","Qatar","Saudi Arabia","Germany"],
    programming:["HTML","CSS","Java Script"],
    movies:["smile","3 idots","osman","omar"]
};
//get properity
let allkeys= Object.keys(words);
//get random number of keys
let keyspropnumber=Math.floor( Math.random()*allkeys.length);
//get random name of key
let keyspropname=allkeys[keyspropnumber];
//get random value of key
let randompropvalue=words[keyspropname];
//get random num of values
let wordvaluenumber=Math.floor( Math.random()*randompropvalue.length);
//get random value of value
let wordvaluevalue=randompropvalue[wordvaluenumber];

//set category info
document.querySelector(".game_info .category span").innerHTML=keyspropname;

//set letter guess container
let letterguesscontainer=document.querySelector(".letters_guess");
let letterandspace=Array.from(wordvaluevalue); 

letterandspace.forEach(letter=>{
    let emptyspan=document.createElement("span");
    
    if(letter===' '){
        emptyspan.className=(`has-space`)
    }
    letterguesscontainer.appendChild(emptyspan);
});

//letter guess span
let guessspan= document.querySelectorAll(".letters_guess span");
let guessspanclicked= document.querySelectorAll(".letters_guess span .clicked");
let wrongAttempts=0;
let rightAttempts=0;
let thedraw=document.querySelector(".hangman_draw");
document.addEventListener("click", (e) => {
        //set status
        let thestatus= false;

        if (e.target.className === 'letter-box') {
            e.target.classList.add("clicked");
            let theclickedletter = e.target.innerHTML.toLowerCase();
            //choosen letter
            let thechoosenletter=Array.from(wordvaluevalue.toLowerCase())
            //loop thechoosen letter
            thechoosenletter.forEach((wordletter, wordindex) => {
                if (theclickedletter == wordletter) {
                    //set status for correct
                    thestatus= true;
                //loop for guess spans
                guessspan.forEach((span,spanindex)=>{
                    if(wordindex===spanindex){
                        span.innerHTML=theclickedletter
                    }
                })  
            }  
            });
            if(thestatus!==true){
                wrongAttempts++;
                thedraw.classList.add(`wrong-${wrongAttempts}`)
                if(wrongAttempts===8){
                endGame();
                lettterscontainer.classList.add("finished");
                }
            }else{
                    rightAttempts++;
                    let allFilled = Array.from(guessspan).every(span => span.textContent !== "");
                    thedraw.classList.add(`right-${rightAttempts}`);
                    console.log(guessspan.length+ " --- "+allFilled +"--------- ");
                    if (rightAttempts === guessspan.length || allFilled) {
                        endGame1();
                        lettterscontainer.classList.add("finished");
                    }
            
                }
            
            
        }
    });
    function endGame(){
        let div=document.createElement("div");
        let text=document.createTextNode(`game over, the word is ${wordvaluevalue}`);
        div.appendChild(text);
        div.className=(`popup`);
        document.body.appendChild(div);
    };
    function endGame1(){
        let div=document.createElement("div");
        let text=document.createTextNode(`Bravo, the word is ${wordvaluevalue}`);
        div.appendChild(text);
        div.className=(`popup`);
        document.body.appendChild(div);
    }
    