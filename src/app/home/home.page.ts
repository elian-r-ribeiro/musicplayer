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
        this.audio.src = this.songs[this.currentSongIndex].audio;
        this.setSongInfo(this.currentSongIndex);
      }
  }

  currentSongName?: string;
  currentSongOwner?: string;
  currentSongImage?: string;
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
      this.setSongInfo(this.currentSongIndex);
    }
    this.isSongPlaying = true;
    this.audio.play();
  }

  setSongInfo(index: number) {
    this.currentSongName = this.songs[index].title;
    this.currentSongOwner = this.songs[index].artist;
    this.currentSongImage = this.songs[index].image;
  }

  pauseSong() {
    this.isSongPlaying = false;
    this.audio!.pause();
  }

  nextSong() {
    this.currentSongIndex++;
    this.isSongPlaying = true;
    this.audio!.src = this.songs[this.currentSongIndex].audio;
    this.setSongInfo(this.currentSongIndex);
    this.audio!.play();
  }

  previousSong() {
    this.currentSongIndex--;
    this.isSongPlaying = true;
    this.audio!.src = this.songs[this.currentSongIndex].audio;
    this.setSongInfo(this.currentSongIndex);
    this.audio!.play();
  }
}
