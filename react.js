class Album {
  constructor(name, artist, features, audio, cover, year, story) {
    this.album_name = name;
    this.artist = artist;
    this.features = features;
    this.audio = audio;
    this.cover = cover;
    this.year = year;
    this.story = story;
  }
}
const [prev, play, next, pause] = [
  document.getElementById(`prev`),
  document.getElementById(`play`),
  document.getElementById(`next`),
  document.getElementById(`pause`),
];
let playing = document.querySelector(`.playing`).children[0];
let currentTime = document.querySelector(`.time`).children[0].innerText;
let duration = document.querySelector(`.time`).children[1].innerText;
let download = document.querySelectorAll(`.download`);
let album = document.querySelectorAll(`.track`);
const [time_start, time_end] = [
  document.querySelector(`.time_start`),
  document.querySelector(`.time_end`),
];
let progressBar = document.querySelector(`.progress_bar`);
const progessContainer = document.querySelector(`.progress_container`);
const hero = document.querySelector(`.hero`);
let audio = [`Melissa`, `Precious Time`, `Drama`, `INdaba`];
let ltf_story = [
  ` i met melissa at college 2020 she was struggling with her registration
    then i decided to assist her. we started to hag out i still remember
    the moment having strike we chilled together and that where i even noticed her beautiful eyes.
    honestly she was a very complicated person because i thought she felt something too we were so connected.`,

  ` precious time was inspired by a next door lady i used to hear them partying next door but i never saw her drinking.
    i wanted to chill or party with her and the time i had the chance i fucked up the moment simply because i lied to her.
    ngamtshela ukuthi ngiyamthanda kodwa lokho bekungasilo iqiniso , iqiniso bekungukuthi i liked her cos she was hot but 
    i just wanted to chill or party with her that all.`,
  ` Drama was simply about the high school girl she was trippin dwg lol everytime we talking she always tell me about her mom.
    it was crazy because even we were chatting she always mention her mom.`,
  ` indaba was written by worseT so my verse was about my ex she broke my heart. 
    few days after a broke up she dated another man.
    like two days after we broke up so everyone was surprised becuase everyone knew she was my girl.
    if im say everyone im talking about my niggas, friends even my fans becuase we used to flex on social media it's was crazy!!`,
];
const producers = [`FOH`, `Classiq Beats`, `Classiq Beats`, `FOH & Worse T`];
const features = [``, `Classiq Beats`, ``, `Worse T`];
const [album_name, artist, feature, producer, year, words, story] = [
  document.querySelector(`.album_name`),
  document.querySelector(`.artist`),
  document.querySelector(`.feature`),
  document.querySelector(`.producer`),
  document.querySelector(`.year`),
  document.querySelector(`.words`),
  document.querySelector(`.story`),
];

let x = 0; //song intitializer
let song = document.querySelector(`.audio_anchor`);
song.innerHTML = `<audio class="song_1" src="./audio/${audio[x]}.mp3"></audio>`;

//loop that sets the track list for the album
for (let i = 0; i < audio.length; i++) {
  album[
    i
  ].innerHTML = `${audio[i]}  <a href="./audio/${audio[i]}.mp3" download="${audio[i]}.mp3">
    <img src="./icons/circle-down.svg" class="download" alt="download"></a>`;
  console.log(album[i].innerText);
}

document.querySelector(`.disk`).classList.add(`play`);
//functions
//progress bar fuction
function updateProgress(e) {
  let { duration, currentTime } = e.srcElement;
  let progressPercent = (currentTime / duration) * 100;

  progressBar.style.width = `${progressPercent}%`;

  time_start.innerHTML = `${timeConverter(Math.floor(currentTime))}`;
  time_end.innerHTML = `${timeConverter(Math.floor(duration))}`;
}

//play button
const playSong = () => {
  song.children[0].play();
  play.classList.add(`play`);
  pause.classList.remove(`play`);
  song.children[0].addEventListener(`timeupdate`, updateProgress);
  document.querySelector(`.cover img`).classList.add(`play_anime`);
  document.querySelector(`.disk`).classList.remove(`play`);
  song.children[0].addEventListener(`ended`, nextSong);
};

//pause button
const pauseSong = () => {
  song.children[0].pause();
  pause.classList.add(`play`);
  play.classList.remove(`play`);
  document.querySelector(`.cover img`).classList.remove(`play_anime`);
  document.querySelector(`.disk`).classList.add(`play`);
};

//next song button
const nextSong = () => {
  if (x >= audio.length - 1) {
    x = -1;
  }
  x++;
  song.innerHTML = `<audio class="song_1" src="./audio/${audio[x]}.mp3"></audio>`;
  if (play.classList.contains(`play`)) {
    song.children[0].play();
  }
  playing.innerHTML = `${audio[x]}`;
  producer.innerHTML = `${producers[x]}`;
  feature.innerHTML = `${features[x]}`;
  story.innerHTML = `${ltf_story[x]}`;
  song.children[0].addEventListener(`timeupdate`, updateProgress);
  song.children[0].addEventListener(`ended`, nextSong);
};

// play the previous song
const previousSong = () => {
  if (x <= 0) {
    x = audio.length;
  }
  x--;
  song.innerHTML = `<audio class="song_1" src="./audio/${audio[x]}.mp3"></audio>`;
  if (play.classList.contains(`play`)) {
    song.children[0].play();
  }
  playing.innerHTML = `${audio[x]}`;
  story.innerHTML = `${ltf_story[x]}`;
  song.children[0].addEventListener(`timeupdate`, updateProgress);
  song.children[0].addEventListener(`ended`, nextSong);
};

// function that allows dragging of the progress bar

function dragProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  let skipTo = (clickX / width) * song.children[0].duration;
  song.children[0].currentTime = skipTo;
  song.children[0].addEventListener(`ended`, nextSong);
}

// function to convert seconds into minutes
let timeConverter = (timer) => {
  let minuts = Math.floor(timer / 60);
  let seconds = timer;
  let lowsMinutes = `00`;
  let lowsSeconds = `0${seconds}`;

  let multipler = () => {
    if (duration / 60 <= 1) {
      return 1;
    } else {
      return minuts;
    }
  };
  let highsMinuts = `0${minuts}:${timer - 60 * multipler(timer)}`;
  let highsMinutsLows = `0${minuts}:0${timer - 60 * multipler(timer)}`;

  if (timer < 60 && timer >= 10) {
    return `${lowsMinutes}:${timer}`;
  } else if (timer < 60 && timer <= 10) {
    return `${lowsMinutes}:${lowsSeconds}`;
  } else if (timer >= 60 && timer - 60 * multipler(timer) <= 10) {
    return highsMinutsLows;
  } else if (timer >= 60 && timer - 60 * multipler(timer) >= 10) {
    return highsMinuts;
  }
  // for now it works properly for up to 10 minutes convesions
};

//<---Functions Ended--->

//event listeners to add controls to the music player
play.addEventListener(`click`, playSong);
pause.addEventListener(`click`, pauseSong);
next.addEventListener(`click`, nextSong);
prev.addEventListener(`click`, previousSong);
progessContainer.addEventListener(`click`, dragProgressBar);
song.children[0].addEventListener(`ended`, nextSong);

//scrolling effect
window.addEventListener(`scroll`, (e) => {
  hero.style.top = `${64 - scrollY}px`;
});
