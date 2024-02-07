import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-player',
  templateUrl: './bottom-player.component.html',
  styleUrls: ['./bottom-player.component.css'],
})
export class BottomPlayerComponent {
  playClass = 'fa-solid fa-play';
  onClickPlay = (audio: HTMLAudioElement) => {
    if (audio.paused) {
      audio.play();
      this.playClass = 'fa-solid fa-pause';
      // this.startUpdatingCurrentTime();
    } else {
      audio.pause();
      this.playClass = 'fa-solid fa-play';
    }
  };
}
