Peter_pan_song = "";
Harry_potter_theme_song = "";

peter_pan_song_status = "";
harry_potter_theme_song_status = "";

rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

song_name = "";

function preload(){
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotposes);
}
 
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left wrist = " + scoreLeftWrist + ", Score of Right Wrist = " + scoreRightWrist);
        
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + ", leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + ", rightWrist_y = " + rightWrist_y);
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}


function draw(){
    image(video ,0 ,0 ,600 ,530);

    fill("#00ff00");
    stroke("#ff0000");

    peter_pan_song_status = Peter_pan_song.isPlaying();
    console.log("Peter Pan is playing");

    harry_potter_theme_song_status = Harry_potter_theme_song.isPlaying();
    console.log("Harry Potter is playing");

    if(scoreLeftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_theme_song.stop();
        
        if(peter_pan_song_status == false){
            Peter_pan_song.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWrist_x, rightWrist_y, 20);
        Peter_pan_song.stop();
        if(harry_potter_theme_song_status == false){
            Harry_potter_theme_song.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


