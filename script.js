// function playSound(url) { 
//     var a = new Audio(url); 
//     a.play(); 
// }


let tracks = [
    {
        name:"Astronaut in the Ocean",
        art:"img/Astronaut.jpg",
        artist:"Masked Wolf",
        path:"songs/Astronaut.mp3",
    },
    {
        name:"Dubstep Music",
        art:"https://source.unsplash.com/Qrspubmx6kE/640x360",
        artist:"Unknown",
        path:"songs/sound1.mp3",
    },
    {
        name:"Blinding Lights",
        art:"img/blindingLights.jpg",
        artist:"the Weeknd",
        path:"songs/Blinding_Lights.mp3",
    },
    {
        name:"Aabad Barbad",
        art:"img/unknown.jpg",
        artist:"Arijit Singh ",
        path:"songs/aabad.mp3",
    },
]

let updateTimer;
let curr_time = document.querySelector(".current-time");
let total_time = document.querySelector(".total-duration");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let previousBtn = document.querySelector(".prev-track");
let nextBtn = document.querySelector(".next-track");
let playPauseBtn = document.querySelector(".playpause-track");
let seek_slider = document.querySelector(".seek_slider"); 
let volume_slider = document.querySelector(".volume_slider"); 
let Tracks = document.querySelector(".list"); 
let total_duration = document.querySelector(".total-duration"); 
let isPlaying = false;
let track_index = 0;

let curr_track = document.createElement("audio");

const resetValues = () =>{
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    console.log("values Reset")
}

const bgColorChange = () => {
    let red = Math.floor(Math.random() * 256) + 64; 
    let green = Math.floor(Math.random() * 256) + 64; 
    let blue = Math.floor(Math.random() * 256) + 64; 
    let backColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    document.body.style.background = backColor;
}

const playMusic = () =>{
    // curr_track = new Audio(url);
    curr_track.play();
    
    isPlaying = true;
    // trackArt.style.background = "url('img/Astronaut.jpg')";
    // trackArt.style.backgroundRepeat = "no-repeat";
    // trackArt.style.backgroundSize = "cover";
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

const pauseMusic = () =>{
        curr_track.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

const PlaypauseMusic = () =>{
    if(!isPlaying){
        playMusic()
    }
    else{
        pauseMusic()
    }
    // bgColorChange();
}


const loadTrack = (index) =>{
    resetValues();
    clearInterval(updateTimer);

    curr_track.src = tracks[index].path;
    curr_track.load();
    // curr_track.play();
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack); 

    trackArt.style.background = "url(" + tracks[index].art + ")";
    trackArt.style.backgroundRepeat = "no-repeat";
    trackArt.style.backgroundSize = "cover";
    trackArt.style.backgroundPosition = "center";
    trackArtist.innerHTML = tracks[index].artist;
    trackName.innerHTML ="<h2 >"+ tracks[index].name + "</h2>";
    // bgColorChange();
}

const nextTrack = () =>{
    if(track_index<tracks.length-1){
        track_index++;
    }
    else{
        track_index = 0;
    }
    loadTrack(track_index);
    playMusic();
    bgColorChange();
}

const prevTrack= () =>{
    if(track_index == 0){
        track_index = tracks.length-1;

    }
    else{
        track_index--;
    }
    loadTrack(track_index);
    playMusic();
    bgColorChange();
}

function seekUpdate() { 
    let seekPosition = 0; 
    
    // Check if the current track duration is a legible number 
    if (!isNaN(curr_track.duration)) { 
      seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
      seek_slider.value = seekPosition; 
    
      // Calculate the time left and the total duration 
      let currentMinutes = Math.floor(curr_track.currentTime / 60); 
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
      let durationMinutes = Math.floor(curr_track.duration / 60); 
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
    
      // Add a zero to the single digit time values 
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    
      // Display the updated duration 
      curr_time.textContent = currentMinutes + ":" + currentSeconds; 
      total_duration.textContent = durationMinutes + ":" + durationSeconds; 
    } 
} 

const seekTo = () =>{
    seektotime = curr_track.duration * (seek_slider.value /100);
    curr_track.currentTime = seektotime;
}

const musicList = () =>{
    let i = 0;
    for(i=0;i<tracks.length ; i++){
        let li = document.createElement("li");
        let trackname = document.createTextNode(tracks[i].name);
        li.appendChild(trackname);
        document.getElementById("musicItems").appendChild(li);
    }
}

const displayList = () =>{
    
    let display  = document.getElementById("musicItems");
    if(display.className == "hidden"){
        display.className = "visible";
    }
    else{
        display.className = "hidden";
    }
}
loadTrack(0);
musicList();
// nextTrack();
// displayList()