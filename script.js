console.log("Welcome to spotify");

// Initialize the variable

let songs = [
    {songName:"Perfect", filepath:"songs/1Perfect.mpeg", coverpath:"cover/1Perfect.jpg"},
    {songName:"Shape of you", filepath:"songs/2Shape of you.mpeg", coverpath:"cover/2Shape of you.jpg"},
    {songName:"Sapphire", filepath:"songs/3Sapphire.mpeg", coverpath:"cover/3Sapphire.jpg"},
    {songName:"Thinking out loud", filepath:"songs/4Thinking out loud.mpeg", coverpath:"cover/4Thinking out loud.jpg"},
    {songName:"Photograph", filepath:"songs/5Photograph.mpeg", coverpath:"cover/5photograph.jpg"},
    {songName:"Shivers", filepath:"songs/6Shivers.mpeg", coverpath:"cover/6Shivers.jpg"},

]

let songIndex = 0;
let audioElement = new Audio('songs/1Perfect.mpeg');
// let audioElement = new Audio();
// audioElement.src = songs[0].filepath;
// masterSongName.innerText = songs[0].songName;

// let audioElement = new Audio(songs[0].filepath);
// let songIndex = 0;

// masterSongName.innerText = songs[0].songName;

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


masterSongName.innerText = songs[0].songName;

songItems.forEach((element,i) =>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// let audioElement = new Audio('Perfect.mpeg'); 
// audioElementplay();

// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events

audioElement.addEventListener('timeupdate',()=>{
    // update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value
* audioElement.duration/100;
})

const makeAllPlays = ()=>{
     Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        // audioElement.src = `songs/${songIndex+1}.mpeg`;
        audioElement.src = songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


// Update each song's duration automatically
const durationElements = document.getElementsByClassName("timestamp");

songs.forEach((song, index) => {
    let tempAudio = new Audio(song.filepath);

    tempAudio.addEventListener("loadedmetadata", () => {
        let totalSeconds = Math.floor(tempAudio.duration);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        if (seconds < 10) seconds = "0" + seconds;

        durationElements[index].childNodes[0].textContent = `${minutes}:${seconds}`;
    });
});