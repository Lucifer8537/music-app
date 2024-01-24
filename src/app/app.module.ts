import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { HomeComponent } from './home/home.component';
import { CardViewComponent } from './home/card-view/card-view.component';
import { BottomPlayerComponent } from './bottom-player/bottom-player.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaPlayerComponent,
    HomeComponent,
    CardViewComponent,
    BottomPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
