import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {VgApiService} from '@videogular/ngx-videogular/core';
import { MainService } from 'src/app/services/main.service';
import * as parser from 'iptv-playlist-parser';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  jsonP = new JsonPipe()
  api: VgApiService = new VgApiService
  preload: string = 'auto'

  playerType = ""
  canales: any
  canal: any
  paises: any
  streams: any
  selectedCountry = 'none'
  selectedList: any
  selectedChannel = "https://rtvelivestream.akamaized.net/segments/la1/la1_main.m3u8"

  constructor(private router: ActivatedRoute, private ms: MainService) {

    this.router.params.subscribe(res => {
      this.playerType = res['type'];
    })

   }

  ngOnInit(): void {
    // this.ms.cargarCanales().subscribe(res => {
    //   this.list = parser.parse(res)
    //   console.log(this.list.items)
    // })
    this.ms.cargarPaises().subscribe( paises => {
      this.paises = paises
    })
    this.ms.cargarCanales().subscribe( canales => {
      this.canales = canales
    })
    this.ms.cargarStreams().subscribe( streams => {
      this.streams = streams
    })
  }


  onPlayerReady(api: VgApiService) {
    this.api = api
  }

  seleccionarPais(code: string) {
    this.selectedCountry = code
    this.selectedList = this.canales.filter((item: any) => item['country'] === code)
    console.log(this.canales)
    console.log(this.selectedList)
  }

  seleccionarCanal(canal: string, logo: string, website: string) {
    const channel = this.streams.filter((item: any) => item['channel'] === canal)
    console.log(channel)
    console.log(logo)
    if (channel.length == 0 ) {
      this.selectedChannel = "none"
      this.canal = {
        nombre: canal,
        logo: logo,
        website: website
      }
      console.log('no hay canal')
    } else {
      this.selectedChannel = channel[0].url
      console.log(this.selectedChannel)
    }
  }

  // TODO : mostrar los canales del pais y enlazarlos a los streams por el nombre





  // seleccionarPais(code: string) {
  //   this.ms.cargarCanales().subscribe(res => {
  //     const rawChannels = JSON.parse(JSON.stringify(res))
  //     this.canales = rawChannels.filter((item: any) => item['country'] === code)
  //     console.log(this.canales)
  //   })
  // }

  // selectChannel(link: string) {
  //   this.selectedChannel = link
  //   console.log(this.selectedChannel)
  // }

}
