import { Component, OnInit } from '@angular/core';
import { OnepieceService } from './onepiece.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-onepiece',
  templateUrl: './onepiece.component.html',
  styleUrls: ['./onepiece.component.scss']
})
export class OnepieceComponent implements OnInit{
  season: number = Number(localStorage.getItem('onepiece-season')) || 1;
  episode: number = Number(localStorage.getItem('onepiece-episode')) || 1;
  newSeason: number = this.season;
  newEpisode: number = this.episode;
  editing: boolean = false;
  base_url = 'https://aniworld.to/redirect/';
  video_url!: SafeResourceUrl;

  episode_info = [61, 16, 14, 39, 13, 52, 33, 35, 73, 45, 26, 14, 101, 58, 62, 50, 56, 55, 74, 14, 167];
  
  constructor(private onepieceService: OnepieceService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadEpisode()
  }

  edit() {
    this.editing = !this.editing;
  }

  loadEpisode() {
    this.onepieceService.load_episode(this.season, this.episode).subscribe(data => {
      this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.base_url + data.redirect_id);

    })
  }

  resetInputs() {
    this.newEpisode = this.episode;
    this.newSeason = this.season;
  }

  changeEpisode() {
    this.edit()
    if (this.newSeason < 1 || this.newSeason > 21) {
      this.resetInputs();
      return;
    }
    if (this.episode_info[this.newSeason - 1] < this.newEpisode || this.newEpisode < 1) {
      this.resetInputs();
      return
    }

    this.season = Number(this.newSeason);
    this.episode = Number(this.newEpisode);
    localStorage.setItem("onepiece-season", this.season.toString());
    localStorage.setItem("onepiece-episode", this.episode.toString());
    this.resetInputs();
    this.loadEpisode();
  }

  previousEpisode() {
    if (this.episode == 1 && this.season == 1) {
      return;
    }

    if (this.episode == 1) {
      this.season -= 1;
      this.episode = this.episode_info[this.season - 1];
    } else {
      this.episode -= 1;
    }
    localStorage.setItem("onepiece-season", this.season.toString());
    localStorage.setItem("onepiece-episode", this.episode.toString());
    this.loadEpisode();
  }
  
  nextEpisode() {
    if (this.season == this.episode_info.length && this.episode >= this.episode_info[this.season - 1]) {
      return;
    } 

    if (this.episode >= this.episode_info[this.season - 1]) {
      this.season += 1;
      this.episode = 1;
    } else {
      this.episode += 1;
    }
    localStorage.setItem("onepiece-season", this.season.toString());
    localStorage.setItem("onepiece-episode", this.episode.toString());
    this.loadEpisode();

  }
}
