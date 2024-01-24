import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar') progressBar!: ElementRef;
  playClass = 'fa-solid fa-play';
  currentTime = 0;
  totalDuration = 0;
  intervalId!: number;
  percentage = '0%';
  isDrag = false;
  startTimeSec = '00';
  startTimeMin = '00';
  endTimeSec = '00';
  endTimeMin = '00';
  albumImg = '../../assets/maroon5.png';
  albumGif = '../../assets/songs/maroon5/Fk7l.gif';
  albumArt!: string;
  isGif!: boolean;

  constructor(private renderer: Renderer2) {}

  onClickPlay = (audio: HTMLAudioElement) => {
    if (audio.paused) {
      audio.play();
      this.playClass = 'fa-solid fa-pause';
      this.startUpdatingCurrentTime();
    } else {
      audio.pause();
      this.playClass = 'fa-solid fa-play';
    }
  };

  startUpdatingCurrentTime = () => {
    this.intervalId = setInterval(() => {
      this.updateCurrentTime();
    }, 100) as any;
  };

  stopUpdatingCurrentTime = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  };

  onMetadataLoaded = (event: Event) => {
    const audio = event.target as HTMLAudioElement;
    if (this.albumGif && this.albumGif.length > 0) {
      this.albumArt = this.albumGif;
      this.isGif = true;
    } else {
      this.albumArt = this.albumImg;
      this.isGif = false;
    }
    this.totalDuration = audio.duration;
    console.log(this.totalDuration);
    const min = Math.floor(this.totalDuration / 60);
    const sec = Math.floor(this.totalDuration % 60);
    this.endTimeMin = min.toLocaleString();
    this.endTimeSec = sec.toLocaleString();
    if (this.endTimeMin.length === 1) this.endTimeMin = '0' + this.endTimeMin;
    if (this.endTimeSec.length === 1) this.endTimeSec = '0' + this.endTimeSec;
  };

  updateCurrentTime = () => {
    const audio = this.audioPlayer.nativeElement;
    this.currentTime = audio.currentTime;
    const percentage = (this.currentTime / this.totalDuration) * 100;
    this.percentage = percentage + '%';
    if (percentage === 100) {
      this.audioPlayer.nativeElement.pause();
      this.playClass = 'fa-solid fa-play';
    }
    this.startTimeFormat(this.currentTime);
  };

  onClickProgressBar = (event: MouseEvent, progress: HTMLElement) => {
    this.isDrag = true;

    this.renderer.listen('document', 'mousemove', (moveEvent: MouseEvent) => {
      if (this.isDrag) {
        this.updateProgress(moveEvent, progress);
      }
    });

    this.renderer.listen('document', 'mouseup', () => {
      if (this.isDrag) {
        this.isDrag = false;
      }
    });
  };
  updateProgress = (event: MouseEvent, progress: HTMLElement) => {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / this.progressBarWidth()) * 100;
    this.percentage = percentage + '%';
    this.seekSong(percentage);
  };

  onDragProgressBar = (event: MouseEvent) => {
    console.log('event : ', event);
  };

  private progressBarWidth(): number {
    const progressBar = this.progressBar.nativeElement as HTMLElement;
    return progressBar.clientWidth;
  }

  seekSong = (percentage: number) => {
    const current = (this.totalDuration * percentage) / 100;
    this.audioPlayer.nativeElement.currentTime = current;
  };

  startTimeFormat = (currentTime: number) => {
    const min = Math.floor(currentTime / 60);
    const sec = Math.floor(currentTime % 60);
    this.startTimeMin = min.toLocaleString();
    this.startTimeSec = sec.toLocaleString();
    if (this.startTimeMin.length === 1)
      this.startTimeMin = '0' + this.startTimeMin;
    if (this.startTimeSec.length === 1)
      this.startTimeSec = '0' + this.startTimeSec;
  };
}
