song="";
leftwristX="";
leftwristY="";
rightwristX="";
rightwristY="";
scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    song= loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet  =ml5.poseNet(video,modelloaded);
    poseNet.on('pose',getPoses);
}
function modelloaded(){
    console.log("model");
}
function getPoses(results){
    if(results.length > 0){
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("lwx"+leftwristX+"lwy"+leftwristY);
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rwx"+rightwristX+"rwy"+rightwristY);
    }
}
function draw(){
    image(video,0,0,500,500);

    fill("red");
    stroke("blue");
   if(scoreRightWrist > 0.2){
       circle(rightwristX,rightwristY,20);
       if(rightwristY > 0 && rightwristY < 101){
           document.getElementById("speed").innerHTML = "Speed = 0.5x";
           song.rate(.5);
       }
        else if(rightwristY > 100 && rightwristY < 201){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
        else if(rightwristY > 200 && rightwristY < 301){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
        else if(rightwristY > 300 && rightwristY < 401){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightwristY > 400 && rightwristY < 501){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist > 0.2){
        circle(leftwristX,leftwristY,20);
        leftnumber = Number(leftwristY);
        remove_decimal_left_y = floor(leftnumber);
        volume = remove_decimal_left_y/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        console.log("volume"+volume)
    }



 





   
}
function playBtn(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}