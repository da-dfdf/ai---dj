song = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;

function preload(){
 song = loadSound("music.mp3");

}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(670, 300);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function draw(){
    image(video, 0, 0, 600,500);

    stroke("red");
    fill("red");

    if(score_leftWrist > 0.05){
        circle(left_wrist_x,left_wrist_y,30);

        number = Number(left_wrist_y);
        decimal = floor(number);
        position = decimal/500;
        console.log(position);
        volume = 1 - position;
        volume_final = volume.toFixed(2) * 100;
        console.log(volume_final);
        document.getElementById("volume").innerHTML = "Volume: " + volume_final + "%";
        song.setVolume(volume_final);
    
    }
    
    stroke("red");
    fill("red");
    
    if(score_rightWrist > 0.05){
        
    
    circle(right_wrist_x,right_wrist_y,30);
    
    if(right_wrist_y > 0 && right_wrist_y <= 100){
        document.getElementById("speed").innerHTML = "Speed: 2.5x"; 
        song.rate(2.5);
    }
    
    else if(right_wrist_y > 100 && right_wrist_y <= 200){
        document.getElementById("speed").innerHTML = "Speed: 2.0x"; 
        song.rate(2);
    }
    
    else if(right_wrist_y > 200 && right_wrist_y <= 300){
        document.getElementById("speed").innerHTML = "Speed: 1.5x"; 
        song.rate(1.5);
    }
    
    else if(right_wrist_y > 300 && right_wrist_y <= 400){
        document.getElementById("speed").innerHTML = "Speed: 1.0x"; 
        song.rate(1);
    }
    
    else if(right_wrist_y > 400 && right_wrist_y <= 500){
        document.getElementById("speed").innerHTML = "Speed: 0.5x"; 
        song.rate(0.5);
    }
    }


}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
      if(results.length > 0){
          console.log(results)
          left_wrist_x = results[0].pose.leftWrist.x;
          left_wrist_y = results[0].pose.leftWrist.y;
          right_wrist_x = results[0].pose.rightWrist.x;
          right_wrist_y = results[0].pose.rightWrist.y;

          console.log("left_wrist_x = " + left_wrist_x + " , left_wrist_y = " + left_wrist_y);
          console.log("right_wrist_x = " + right_wrist_x + " , right_wrist_y = " + right_wrist_y);

          score_leftWrist = results[0].pose.keypoints[9].score;
          console.log("score left: " + score_leftWrist);
          
          score_rightWrist = results[0].pose.keypoints[10].score;
          console.log("score right: " + score_rightWrist);
        }

    
}