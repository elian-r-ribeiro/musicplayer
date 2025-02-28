import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor() {}

  ngOnInit(): void {
      if(this.audio == undefined) {
        this.audio = new Audio();
        const ramdomIndex = Math.floor(Math.random() * this.songs.length);
        this.currentSongIndex = ramdomIndex;
        this.audio.src = this.songs[this.currentSongIndex].audio;
        
        this.audio.addEventListener('loadedmetadata', () => {
          this.setSongInfo(ramdomIndex, this.audio!.duration);
        });
      }
  }

  currentSongName?: string;
  currentSongOwner?: string;
  currentSongImage?: string;
  currentTimeOfTheSong?: number = 0;
  currentSongDuration?: number = 0;
  progress: number = 0;
  currentSongIndex = 0;
  isSongPlaying = false;
  audio?: HTMLAudioElement;

  songs = [
    {
      title: 'Meteoro',
      artist: 'Luan Santana',
      image: '../../assets/images/luan-santana.jpg',
      audio: '../../assets/songs/meteoro.mp3'
    },
    {
      title: 'Lepo Lepo',
      artist: 'Psirico',
      image: '../../assets/images/psirico.jpg',
      audio: '../../assets/songs/lepo-lepo.mp3'
    },
    {
      title: 'Sonne [TIKTOK VERSION]',
      artist: 'Rammstein',
      image: '../../assets/images/rammstein.jpg',
      audio: '../../assets/songs/sonne.mp3'
    },
  ]

  playSong() {
    if(this.audio == undefined) {
      this.audio = new Audio();
      this.audio.src = this.songs[this.currentSongIndex].audio;
      this.setSongInfo(this.currentSongIndex, this.audio!.duration);

    }
    this.isSongPlaying = true;
    this.audio.play();

    this.audio.ontimeupdate = () => {
      this.currentTimeOfTheSong = this.audio!.currentTime;
      this.currentSongDuration = this.audio!.duration;
      this.progress = (this.currentTimeOfTheSong / this.currentSongDuration) * 100;
    };

    this.audio.onended = () => {
      this.nextSong();
    };
  }

  setSongInfo(index: number, duration: number) {
    this.currentSongName = this.songs[index].title;
    this.currentSongOwner = this.songs[index].artist;
    this.currentSongImage = this.songs[index].image;
    this.currentSongDuration = duration;
  }

  pauseSong() {
    this.isSongPlaying = false;
    this.audio!.pause();
  }

  nextSong() {
    this.currentSongIndex++;

    if(this.currentSongIndex >= this.songs.length) {
      this.currentSongIndex = 0;
    }

    this.isSongPlaying = true;
    this.audio!.src = this.songs[this.currentSongIndex].audio;
    this.audio!.addEventListener('loadedmetadata', () => {
      this.setSongInfo(this.currentSongIndex, this.audio!.duration);
    });
    this.audio!.play();
    this.resetProgress();
  }

  previousSong() {
    this.currentSongIndex--;
    this.isSongPlaying = true;
    this.audio!.src = this.songs[this.currentSongIndex].audio;
    this.audio!.addEventListener('loadedmetadata', () => {
      this.setSongInfo(this.currentSongIndex, this.audio!.duration);
    });
    this.audio!.play();
    this.resetProgress();
  }

  resetProgress() {
    this.currentTimeOfTheSong = 0;
    this.currentSongDuration = 0;
    this.progress = 0;
  }

  seek(event: any) {
    const seekTime = (event.detail.value / 100) * this.currentSongDuration!;
    this.audio!.currentTime = seekTime;
  }

  formatTime(timeInSeconds: number): string {
    if (!timeInSeconds) return '00:00';
    const minutes: number = Math.floor(timeInSeconds / 60);
    const seconds: number = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
