import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private http: HttpClient) { }


  // cargarCanales(): Observable<string> {
  //   return this.http.get('assets/listaEsp.m3u', {responseType: 'text'})
  // }

  cargarPaises() {
    return this.http.get('https://iptv-org.github.io/api/countries.json')
  }

  cargarStreams() {
    return this.http.get('https://iptv-org.github.io/api/streams.json')
  }

  cargarCanales() {
    return this.http.get('https://iptv-org.github.io/api/channels.json')
  }

}
