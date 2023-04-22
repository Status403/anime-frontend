import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment.prod';

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
  base_url = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  load_episode(s: number, e: number) {
    return this.httpClient
    .get<Info>(this.base_url + `episode?episode=${e}&season=${s}`);
  }
}
