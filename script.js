console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0; // Ensure this is globally declared
let myProgressBar = document.getElementById('myProgressBar');
const playButton = document.querySelector('.play-btn'); // Checkbox play button
let gif = document.getElementById('gif');
gif.style.opacity = "0"; // Hide GIF initially
let formattedTime = document.getElementById('progress-bar-time-update')

// Song list (initial songs)
let songs = [
    { songName: "Warriyo Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Ceilo- Huma Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Deaf Kev - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven- My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "On & On | Animagus Roy", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Crying soul", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" }
];

let audioElement = new Audio(songs[songIndex].filePath); // Load first song by default

// Function to populate the container with songs dynamically
function populateSongs() {
    const container = document.getElementById("scrollContainer");
    container.innerHTML = ''; // Clear existing songs

    songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "songItem";
        div.setAttribute("data-index", index); // Set the index attribute
        div.innerHTML = `
            <img src="${song.coverPath}" alt="${song.songName}">
            <span class="songName">${song.songName}</span>
            <span class="songListplay"><i class="fa-solid fa-play-circle"></i></span>
        `;
        container.appendChild(div);
    });

    // Re-attach event listeners for all song items
    document.querySelectorAll(".songItem").forEach((item, index) => {
        item.addEventListener("click", function() {
            songIndex = index; // Update the songIndex
            updateSongDetails(songIndex); // Call function to update details and play song
        });
    });
}

// Function to update song details and play the song
function updateSongDetails(index) {
    if (!songs[index]) {
        console.error("Invalid song index:", index);
        return;
    }

    // Update song name in the display
    document.querySelector(".songNameCurrent").textContent = songs[index].songName;

    // Update audio source and play the song
    audioElement.src = songs[index].filePath;
    audioElement.play();

    // Update background image of the container
    document.querySelector(".container").style.backgroundImage = `url('${songs[index].coverPath}')`;

    // Show the GIF and auto-check the checkbox when a new song is played
    playButton.checked = true;
    gif.style.opacity = 1;

    // Update the 'clicked' class on the song items
    document.querySelectorAll(".songItem").forEach(item => {
        item.classList.remove("clicked"); // Remove 'clicked' class from all songItems
    });
    document.querySelector(`.songItem[data-index="${index}"]`).classList.add("clicked"); // Add 'clicked' class to the current song
}

// Initial population of songs
populateSongs();

// ✅ Play/Pause Toggle (Checkbox)
playButton.addEventListener('change', () => {
    if (playButton.checked) {
        audioElement.play();
        console.log("Playing the song");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        console.log("Paused the song");
        gif.style.opacity = 0;
    }
});

// ✅ Function to format time as "mm:ss"
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// ✅ Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        // Update progress bar
        myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;

        // Get the current time and total time
        const currentTimeFormatted = formatTime(audioElement.currentTime);
        const fullTimeFormatted = formatTime(audioElement.duration);

        // Update the time display to show "currentTime/fullTime"
        document.getElementById('progress-bar-time-update').textContent = `${currentTimeFormatted}/${fullTimeFormatted}`;
    }
});

// ✅ Seek functionality
myProgressBar.addEventListener('input', () => {
    if (!isNaN(audioElement.duration)) {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    }
});

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;  // Ensure songIndex doesn't go below 0
    } else {
        songIndex -= 1;
    }
    
    // Get the song data
    const currentSong = songs[songIndex];

    // Update the song name in the span
    document.querySelector(".songNameCurrent").textContent = currentSong.songName;

    // Update the audio source and play the song
    audioElement.src = currentSong.filePath;
    audioElement.play();

    // Update the background image of the container
    document.querySelector(".container").style.backgroundImage = `url('${currentSong.coverPath}')`;

    // Auto-check the checkbox when a new song is played
    playButton.checked = true;

    // Show the gif
    gif.style.opacity = 1;

    // Update the 'clicked' class on the song items
    document.querySelectorAll(".songItem").forEach(item => {
        item.classList.remove("clicked"); // Remove 'clicked' class from all songItems
    });
    document.querySelector(`.songItem[data-index="${songIndex}"]`).classList.add("clicked"); // Add 'clicked' class to the current song

    console.log("The previous button is pressed");
});

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;  // Reset to the first song if at the end
    } else {
        songIndex += 1;
    }

    // Get the song data
    const currentSong = songs[songIndex];

    // Update the song name in the span
    document.querySelector(".songNameCurrent").textContent = currentSong.songName;

    // Update the audio source and play the song
    audioElement.src = currentSong.filePath;
    audioElement.play();

    // Update the background image of the container
    document.querySelector(".container").style.backgroundImage = `url('${currentSong.coverPath}')`;

    // Auto-check the checkbox when a new song is played
    playButton.checked = true;

    // Show the gif
    gif.style.opacity = 1;

    // Update the 'clicked' class on the song items
    document.querySelectorAll(".songItem").forEach(item => {
        item.classList.remove("clicked"); // Remove 'clicked' class from all songItems
    });
    document.querySelector(`.songItem[data-index="${songIndex}"]`).classList.add("clicked"); // Add 'clicked' class to the current song

    console.log("The next button is pressed");
});

//Add new songs to the songs array
songs.push(
    { songName: "Jim Yosef - Link", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Me & You - Uplink & Alexandro", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    {songName:"Different Heaven- Nekozilla",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},
    {songName:"JJD - Adventure",filePath:"songs/11.mp3",coverPath:"covers/11.jpg"},
    {songName:"Feel Good - Syn Cole",filePath:"songs/12.mp3",coverPath:"covers/12.jpg"},
    {songName:"Make me Move - Culture Code",filePath:"songs/13.mp3",coverPath:"covers/13.jpg"},
    {songName:"Lensko - Let's Go",filePath:"songs/14.mp3",coverPath:"covers/14.jpg"},
    {songName:"Aero Chord feat, DDARk- Shooting",filePath:"songs/15.mp3",coverPath:"covers/15.jpg"},
    {songName:"Jex Control",filePath:"songs/16.mp3",coverPath:"covers/16.jpg"},
    {songName:"Cartoon - C U Again",filePath:"songs/17.mp3",coverPath:"covers/17.jpg"},
    {songName:"Spektrum & Sara Skinner - Keep You",filePath:"songs/18.mp3",coverPath:"covers/18.jpg"},
    {songName:"Venemy & AzNar - Reign",filePath:"songs/19.mp3",coverPath:"covers/19.jpg"},
    {songName:"JPB - High",filePath:"songs/20.mp3",coverPath:"covers/20.jpg"},
    {songName:"Elektronomika - Limitless",filePath:"songs/21.mp3",coverPath:"covers/21.jpg"},
    {songName:"it's different - Shadows & Miss Marry",filePath:"songs/22.mp3",coverPath:"covers/22.jpg"},
);

// After adding new songs to the array, call populateSongs to reflect the changes
populateSongs();

