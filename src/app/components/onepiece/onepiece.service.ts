import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Info {
  _id: string
  redirect_id: string
  episode: number
  season: number
}

@Injectable({
  providedIn: 'root'
})
export class OnepieceService {
  base_url = "https://misty-kimono-jay.cyclic.app/";
  constructor(private httpClient: HttpClient) { }

  load_episode(s: number, e: number) {
    return this.httpClient
    .get<Info>(`https://misty-kimono-jay.cyclic.app/episode?episode=${e}&season=${s}`);
  }
}
