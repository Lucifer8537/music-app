import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playClassSub = new Subject<string>();
  pause = 'fa-pause';
  play = 'fa-play';
  constructor() {}
  onPlayOrPause = (pause: boolean) => {
    if (pause) {
      this.playClassSub.next(this.pause);
    } else {
      this.playClassSub.next(this.play);
    }
  };
}
