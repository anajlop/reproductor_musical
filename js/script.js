const canciones = [
    {
        titulo: "Cancion",
        album: "Álbum",
        artista: "Artista",
        duración: "0:00",
        imagen: "images/.jpg",
        audio: "images/musica/.mp3",
    },{
        titulo: "Cancion",
        album: "Álbum",
        artista: "Artista",
        duración: "0:00",
        imagen: "images/.jpg",
        audio: "images/musica/.mp3",
    }
];

class Reproductor {
    constructor(songs){
        this.songs = songs;
        this.enReproduccion = false;
        this.ahoraSuena = 0;
    }

    playPause(){
        if (this.enReproduccion){
            this.enReproduccion = false;
            document.getElementById('playPauseBtn').textContent = 'Reproducir';
        } else {
            this.enReproduccion = true;
            document.getElementById('playPauseBtn').textContent = 'Pausar';
            this.showSongInSite();
        }
    }

    stop(){
        this.enReproduccion = false;
        document.getElementById('playPauseBtn').textContent = 'Reproducir';
        document.getElementById('songDetails').textContent = ''; //limpia residuos de una cancion detalles
    }

    shuffle(){
        //abajo esta pa que genere número aleatorio dela cancion
        this.ahoraSuena = Math.floor(Math.random() * this.songs.length);
        this.showSongInSite();
    }

    next(){
        if (this.ahoraSuena < this.songs.length - 1){
            this.ahoraSuena++;
            this.showSongInSite();
        }
    }

    prev(){
        if (this.ahoraSuena > 0){
            this.ahoraSuena--;
            this.showSongInSite();
        }
    }

    showSongInSite(){ //detalle cancion en el sitio
        const song = this.songs[this.ahoraSuena];
        const songDetails =
    }
}

const reproductor =new Reproductor(songs);

document.getElementById('playPauseBtn').addEventListener('click', () => reproductor.playPause());
document.getElementById('stopBtn').addEventListener('click', () => reproductor.stop());
document.getElementById('shuffleBtn').addEventListener('click', () => reproductor.shuffle());
document.getElementById('prevBtn').addEventListener('click', () => reproductor.prev());
document.getElementById('nextBtn').addEventListener('click', () => reproductor.next());