const songs = [
    {
        album: "Bad idea",
        artista: "Chris Grey",
        duracion: "00:02:30",
        imagen: "images/cover/bad_idea.jpg",
        audio: "images/albums/bad_idea.mp3"
    },
    {
        album: "Body On Mine",
        artista: "Dauble",
        duracion: "00:03:12",
        imagen: "images/cover/body_on_mine.jpg",
        audio: "images/albums/body_on_mine.mp3"
    },
    {
        album: "Broken Line",
        artista: "Limi",
        duracion: "00:02:59",
        imagen: "images/cover/broken_line.jpg",
        audio: "images/albums/broken_line.mp3"
    },
    {
        album: "Code Red",
        artista: "Darci",
        duracion: "00:02:03",
        imagen: "images/cover/code_red.jpg",
        audio: "images/albums/code_red.mp3"
    },
    {
        album: "Control",
        artista: "Bury",
        duracion: "00:03:28",
        imagen: "images/cover/control.jpg",
        audio: "images/albums/control.mp3"
    },
    {
        album: "Fatal Attraction",
        artista: "Reed Wonder & Aurora Olivas",
        duracion: "00:03:00",
        imagen: "images/cover/fatal_attraction.jpg",
        audio: "images/albums/fatal_attraction.mp3"
    },
    {
        album: "Hypnotica",
        artista: "Dark Eye ft.Myllo",
        duracion: "00:03:27",
        imagen: "images/cover/hypnotica.jpg",
        audio: "images/albums/hypnotica.mp3"
    },
    {
        album: "In Your Arms",
        artista: "Kuoga",
        duracion: "00:03:17",
        imagen: "images/cover/in_your_arms.jpg",
        audio: "images/albums/in_your_arms.mp3"
    },
    {
        album: "One More Night",
        artista: "Chris Grey",
        duracion: "00:04:44",
        imagen: "images/cover/one_more_night.jpg",
        audio: "images/albums/one_more_night.mp3"
    },
    {
        album: "Snow ocean",
        artista: "A1xa",
        duracion: "00:03:16",
        imagen: "images/cover/snow_ocean.jpg",
        audio: "images/albums/snow_ocean.mp3"
    },
    {
        album: "Soundproof",
        artista: "Autumn Corin",
        duracion: "00:02:47",
        imagen: "images/cover/soundproof.jpg",
        audio: "images/albums/soundproof.mp3"
    },
    {
        album: "Summertime",
        artista: "Limi",
        duracion: "00:03:00",
        imagen: "images/cover/summertime.jpg",
        audio: "images/albums/summertime.mp3"
    },
    {
        album: "Time travel",
        artista: "Biffuzi ft.CJ Whoopty",
        duracion: "00:02:22",
        imagen: "images/cover/time_travel.jpg",
        audio: "images/albums/time_travel.mp3"
    },
    {
        album: "Use Me",
        artista: "Dxvn",
        duracion: "00:02:22",
        imagen: "images/cover/use_me.jpg",
        audio: "images/albums/use_me.mp3"
    },
    {
        album: "Weaker Girl",
        artista: "Cheyanne",
        duracion: "00:03:07",
        imagen: "images/cover/weaker_girl.jpg",
        audio: "images/albums/weaker_girl.mp3"
    }    
];

class Reproductor {
    constructor(songs){
        this.songs = songs;
        this.enReproduccion = false;
        this.ahoraSuena = 0;
        this.audioElement = new Audio();
        this.audioElement.addEventListener('timeupdate', () => this.updateProgressBar());
        this.showSongInSite();
    }
    playPause(){
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (this.enReproduccion){
            this.enReproduccion = false;
            this.audioElement.pause();
            playPauseBtn.classList.remove('pause');
            playPauseBtn.src ='images/cover/icons/jugar.png';
        } else {
            this.enReproduccion = true;
            this.audioElement.src = this.songs[this.ahoraSuena].audio;
            this.audioElement.play();
            playPauseBtn.classList.add('pause');
            playPauseBtn.src ='images/cover/icons/pausa.png';
            this.showSongInSite();
        }
    }

    stop(){
        this.enReproduccion = false;
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        const playPauseBtn = document.getElementById('playPauseBtn');
        playPauseBtn.classList.remove('pause');
        playPauseBtn.src ='images/cover/icons/jugar.png';
        document.getElementById('songDetails').innerHTML = ''; //limpia residuos de una cancion detalles
    }

    shuffle(){
        let previousSong = this.ahoraSuena;
        this.ahoraSuena = Math.floor(Math.random() * this.songs.length);
        if(this.ahoraSuena === previousSong && this.songs.length > 1){
            this.ahoraSuena = (this.ahoraSuena + 1) % this.songs.length;
        }
        this.stop();
        this.playPause();
    }

    next(){
        this.ahoraSuena = (this.ahoraSuena + 1) % this.songs.length;
        this.stop();
        this.playPause();
    }

    prev(){
        this.ahoraSuena = (this.ahoraSuena - 1 + this.songs.length) % this.songs.length;
        this.stop();
        this.playPause();
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        const percentage = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        progressBar.style.width = percentage + '%';
    }

    showSongInSite(){//detalle cancion en el sitio
        const song = this.songs[this.ahoraSuena];
        const songDetails =
        `<img src="${song.imagen}" alt="Portada del álbum">
            <p>Álbum: ${song.album}</p>
            <p>Artista: ${song.artista}</p>
            <p>Duración: ${song.duracion}</p>`;
        
        document.getElementById('songDetails').innerHTML = songDetails;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const reproductor = new Reproductor(songs);

    function play(songIndex) {
        reproductor.stop(); 
        reproductor.ahoraSuena = songIndex; 
        reproductor.playPause(); 
    }

    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const buttonId = event.target.id;
            switch(buttonId) {
                case 'playPauseBtn':
                    reproductor.playPause();
                    break;
                case 'stopBtn':
                    reproductor.stop();
                    break;
                case 'shuffleBtn':
                    reproductor.shuffle();
                    break;
                case 'prevBtn':
                    reproductor.prev();
                    break;
                case 'nextBtn':
                    reproductor.next();
                    break;
            }
        });
    });
});
