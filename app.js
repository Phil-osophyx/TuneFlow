const songs = [
  {
    name: "Dancing Queen",
    artist: "ABBA",
    file: "songs/dancingqueen.mp3",
    image: "images/dancingqueen.jpg",
  },
  {
    name: "The Winner Takes It All",
    artist: "ABBA",
    file: "songs/TheWinner.mp3",
    image: "images/the-winner.png",
  },
  {
    name: "Hey Jude",
    artist: "The Beatles",
    file: "songs/heyjude.mp3",
    image: "images/heyjude.jpg",
  },

  {
    name: "Bohemian Rhapsody",
    artist: "The Queen",
    file: "songs/Bohemain.mp3",
    image: "images/bohemian-rhapsody.jpg",
  },
  {
    name: "Kabira",
    artist: "Arijit Singh, Harshdeep Kaur",
    file: "songs/Kabira.mp3",
    image: "images/Kabira.jpeg",
  },
  {
    name: "Arz Kiya Hai",
    artist: "Anuv Jain",
    file: "songs/ArzKiyaHai.mp3",
    image: "images/Arz-kiya-hai.jpg",
  },
  {
    name: "Slow Motion Angreza",
    artist: "Loy Mendonsa, Shankar Mahadevan, and Sukhwinder Singh",
    file: "songs/slowmotionangreza.mp3",
    image: "images/slowmotion.jpg",
  },

  {
    name: "Tere Liye",
    artist: "Atif Aslam",
    file: "songs/tereliye.mp3",
    image: "images/Tere-liye.jpeg",
  },
];

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");

const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerImage = document.getElementById("player-img");

const songCards = document.querySelectorAll(".song");
const playIcon = playButton.querySelector("i");
const loopButton = document.getElementById("loop");

let loopSong = false;

const shuffleButton = document.getElementById("shuffle");

let shuffleOn = false;

let currentSong = 0;

function playSong(index) {
  currentSong = index;
  audio.src = songs[index].file;

  playerTitle.textContent = songs[index].name;
  playerArtist.textContent = songs[index].artist;
  playerImage.src = songs[index].image;

  progress.value = 0;

  audio.play();

  playIcon.classList.remove("fa-play");
playIcon.classList.add("fa-pause");
}

songCards.forEach((song, index) => {
  song.addEventListener("click", () => {
    playSong(index);
  });
});


playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();

    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");

  } else {
    audio.pause();

    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
});


const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const progress = document.getElementById("progress");

// Update Progress Bar

audio.addEventListener("timeupdate", () => {
    if(audio.duration){
        progress.value = (audio.currentTime / audio.duration) *100;
    }
})

// Seek through the song using the progress bar

progress.addEventListener("input", () => {
    if(audio.duration){
        audio.currentTime = (progress.value / 100) * audio.duration;

    }
})

// Next Song

nextButton.addEventListener("click", () => {

    if (shuffleOn) {
        let randomSong;

        do {
            randomSong = Math.floor(Math.random() * songs.length);
        } while (randomSong === currentSong && songs.length > 1);

        playSong(randomSong);

    } else {
        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        playSong(currentSong);
    }
});

// Previous Song

previousButton.addEventListener("click",() => {
  currentSong--;

  if(currentSong < 0){
    currentSong= songs.length -1;
  }

  playSong(currentSong);
})

// Automatically play next song when current song ends

audio.addEventListener("ended", () => {

    if (loopSong) {
        playSong(currentSong);
        return;
    }

    if (shuffleOn) {
        let randomSong;

        do {
            randomSong = Math.floor(Math.random() * songs.length);
        } while (randomSong === currentSong && songs.length > 1);

        playSong(randomSong);
        return;
    }

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    playSong(currentSong);
});


const volume = document.getElementById("volume");

audio.volume = volume.value;

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Loop Songs

loopButton.addEventListener("click", () => {
    loopSong = !loopSong;

    if (loopSong) {
        loopButton.style.color = "#9d7cff";
    } else {
        loopButton.style.color = "#bdbdc7";
    }
});

// Shuffle Songs

shuffleButton.addEventListener("click", () => {
    shuffleOn = !shuffleOn;

    if (shuffleOn) {
        shuffleButton.style.color = "#9d7cff";
    } else {
        shuffleButton.style.color = "#bdbdc7";
    }
});

