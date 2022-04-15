// Author : 000860382 , Divyang Bansu
//File Created on 17-03-2022
// This JS File is demonstrate the use of SVG elments and DOM manipulation
const svgNS = "http://www.w3.org/2000/svg";
// Global variables and elements
let scordx=0;
let scorecount=0;
let introc=0;
let dino = document.createElementNS(svgNS, "image");
let scoretext=document.createElementNS(svgNS,"text");
let restarttext=document.createElementNS(svgNS,"text");
let intro=document.createElementNS(svgNS,"text");

// Creating Dinasour with help of image and assigning values
function drawDino(){
    dino.setAttributeNS("http://www.w3.org/1999/xlink", 'href', "din.png");
    dino.setAttributeNS(null,'height','100');
    dino.setAttributeNS(null,'width','100');
    dino.setAttributeNS(null,'x','50');
    dino.setAttributeNS(null, 'visibility', 'visible');
}


// Creating text element and assigning values
function drawtext(){
    scoretext.setAttribute('x','1300');
    scoretext.setAttribute('y','30');
    scoretext.setAttribute('stroke','Black');
    scoretext.setAttribute('fill','Black');
    scoretext.setAttribute('font-size','20');
}

// WIndows load event
window.addEventListener('load', (event) => {

    // Calling dino method and return whole Object
    function drawMain() {
        drawDino();
        dino.setAttributeNS(null,'y','400');
        return dino;
    }

    // Creating horizontal line for surface
    function horiline(){
        let hline=document.createElementNS(svgNS,"line");
        hline.setAttribute('x1','0');
        hline.setAttribute('y1','480');
        hline.setAttribute('x2','1550');
        hline.setAttribute('y2','480');
        hline.setAttribute('stroke','Black');
        return hline;
    }

    // Displaying score value
    function score(){
       drawtext();
       scoretext.textContent="Your Score: 0";
       scoretext.setAttribute("class","blink");
        return scoretext;
    }


    //Selecting svg tag from main file and adding svg elements
    let svg = document.querySelector("svg");
    svg.appendChild( drawMain() );
    svg.appendChild(horiline());
    svg.appendChild(score());
    // svg.appendChild(logocir());
    
    // Creating Interval for stones to animate
    let main=setInterval(function(){
        // Creating stone element and assigning its value
        let stones = document.createElementNS(svgNS, "rect");
        stones.setAttributeNS(null, "id", "stone" );
        stones.setAttributeNS(null, "x", '1400' );
        let ycord=Math.floor(Math.random() * (470 - 420 + 1) + 420);
        stones.setAttributeNS( null,"y",ycord );
        stones.setAttributeNS( null,"width", Math.floor(Math.random() * (30 - 10 + 1) + 10) );
        stones.setAttributeNS( null,"height", 480-ycord );
        svg.appendChild(stones);
        let count=0;

        //Creating other timer to check if dinosour and stones 
        let timer1=setInterval(function(){
            count++;
            let cordx=stones.getAttribute("x");
            stones.setAttribute('x',parseInt(cordx)-1);
            let y=dino.getAttribute("y");
            // IF co-ordinates of dinosour and stones are match then it restart the game
            if(parseInt(cordx)==100 && parseInt(y)==400){
                // svg.remove("*");
                svg.appendChild(intro);
                // If Dinosour is visible then remove dinosour
                if(svg.appendChild(dino)!=null){
                    svg.removeChild(dino);
                }
                // REmove stones and intervals 
                svg.removeChild(stones);
                svg.removeChild(scoretext);
                clearInterval(main);
                clearInterval(timer1);
                // Displaying Result
                intro.setAttribute('x','550');
                intro.textContent="Your highest score is: "+scorecount;
                restarttext.setAttribute('x','620');
                restarttext.setAttribute('y','250');
                restarttext.setAttribute('fill','Black');
                restarttext.setAttribute('font-size','20');
                restarttext.textContent="Game will restart in few seconds";
                svg.appendChild(restarttext);
                //It will wait for 3 Seconds and restart the game
                setInterval(function(){
                    window.location.reload();
                },3000);
            }
            // If stones are atmost left then it will disappear
            if(count==1550){
                clearInterval(timer1);
                count=0;
            }
        },1);
    },Math.floor(Math.random() * (4000 - 1000 + 1) + 1000));

    let introtimer=setInterval(function(){
        //Creating Information regarding how to play in text element
        intro.setAttribute('x','450');
        intro.setAttribute('y','200');
        intro.setAttribute('stroke','Black');
        intro.setAttribute('fill','Black');
        intro.setAttribute('font-size','40');
        console.log(introc);
        // It will appear for 4 seconds and remove after it
        if(parseInt(introc)!=4){
            intro.textContent="Press Left Mouse click to jump Dinasour ";
            svg.appendChild(intro);
            introc=parseInt(introc)+1;
        }
        else{
            svg.removeChild(intro);
            introc=0;
            console.log(introc);
            clearInterval(introtimer);
        }
    },1000);
  });

//Dinosour jump when left mouse click
function jump(){
    let count=0;
    // Creating timer to jump up and down a dinosour
    let ctimer1=setInterval(function(){
        count++;
        if(count<=80)
            jumpup();
        else if(count<=160)
            jumpdown(); 
        if(count==160){
            clearInterval(ctimer1);
            count=0;
        }
    },5);
    }

    // Jump up a dinosour
function jumpup() { 
    //Remove all elements 
    let svg = document.querySelector("svg");
    let gs = svg.querySelectorAll( "g" );
    gs.forEach ( group => {
        group.parentNode.removeChild( group ); 
    } );

    //Assigning values for dinosour
    let cordy=dino.getAttribute("y");
    dino.setAttribute('y',parseInt(cordy)-1);
    scorecount=parseInt(scorecount)+1; 
    scoretext.textContent="Your Score: "+scorecount;
    return cordy;
 }

 // Jump down a dinosour
 function jumpdown() { 
   //Remove all elements 
    let svg = document.querySelector("svg");
    let gs = svg.querySelectorAll( "g" );
    gs.forEach ( group => {
        group.parentNode.removeChild( group ); 
    } );

      //Assigning values for dinosour
    let cordy=dino.getAttribute("y");
    dino.setAttribute('y',parseInt(cordy)+1);
    
    return cordy;
 }

