
const song=document.getElementById("song");
const playBtn=document.querySelector(".play-inner");
const nextBtn=document.querySelector(".play-forward");
const prevBtn=document.querySelector(".play-back");
const durationTime=document.querySelector(".duration");
const remainingTime=document.querySelector(".remaining");
//rangeBar: nut di chuyen nhac
const rangeBar=document.querySelector(".range");
const musicName=document.querySelector(".music-name");
const musicImage=document.querySelector(".music-thumb img");
const musicThumbnail=document.querySelector(".music-thumb");
const playRepeat= document.querySelector(".play-repeat");
let isPlaying=true;
let indexSong=0;
let isRepeat=false;
// const musics=['holo.mp3','summer.mp3', 'spark.mp3', 'home.mp3'];
const musics=[
    {
        id:1,
        title:"Holo",
        file:"holo.mp3",
        image:"https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
    },

    {
        id:2,
        title:"Summer",
        file:"mp3_music_summer.mp3",
        image:"https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
        id:3,
        title:"Home",
        file:"home.mp3",
        image:"https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

    },
    {
        id:4,
        title:"Spark",
        file:"spark.mp3",
        image:"https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

    },
];
// music:
// id:1
// title:holo
// file:holo.mp3
// image:


//1000=1s
let timer;
let repeatCount = 0;

playRepeat.addEventListener("click", function () {
    if (isRepeat) {
      isRepeat = false;
      playRepeat.removeAttribute("style");
    } else {
      isRepeat = true;
      playRepeat.style.color = "#ffb86c";
    }
});

nextBtn.addEventListener("click",function(){
    changeSong(1);
});
prevBtn.addEventListener("click",function(){
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);

function handleEndedSong(){
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
      // handle repeat song
      isPlaying = true;
      playPause();
    } else {
      changeSong(1);
    }
}
function changeSong(dir){
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
          indexSong = 0;
        }
        isPlaying = true;
      } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
          indexSong = musics.length - 1;
        }
        isPlaying = true;
      }
    init(indexSong);
    // song.setAttribute("src",`${musics[indexSong].file}`);
    playPause();
}
playBtn.addEventListener("click", playPause);

function playPause(){
    // console.log("clicked");
   if(isPlaying){
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML=`<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying=false;
    timer=setInterval(displayTimer, 500);
   }else{
       musicThumbnail.classList.remove("is-playing");
       song.pause();
       playBtn.innerHTML=`<ion-icon name="play" class="play-icon"></ion-icon>`;
       isPlaying=true;
       clearInterval(timer);
   }
}
function displayTimer(){
    const {duration,currentTime}=song;
    rangeBar.max=duration;
    rangeBar.value=currentTime;
    remainingTime.textContent=formatTimer(currentTime);
    if(!duration){
        durationTime.textContent="00:00";
    }else{
        durationTime.textContent=formatTimer(duration);
    }
}
//number:thoi gian, duration:giay
function formatTimer(number){
    const minutes=Math.floor(number/60);
    const seconds=Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes: minutes}:${seconds< 10 ? '0' + seconds: seconds}`;
}
rangeBar.addEventListener("change", handlechangeBar);
function handlechangeBar(){
    song.currentTime=rangeBar.value;
}
//load hinh va cac bai hien tai
function init(indexSong){
    
    song.setAttribute("src",`${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent=musics[indexSong].title;
}
displayTimer();
init(indexSong);