import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  //para mostrar los artículos de las noticias
  noticias: Article[] = [];

  constructor(private noticiaService: NoticiasService) {}

  ngOnInit() {
    this.noticiaService.getTopHeadlines()
    .subscribe(resp => {
      console.log('noticias',resp);
      this.noticias.push(...resp.articles);
    });

    this.cargarNoticias();
  }

  // Método para realizar el evento
  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiaService.getTopHeadlines()
    .subscribe(resp => {
      console.log('noticias', resp);

      // Para evitar cargar más noticias de la cuenta
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;// para salir del método
      }
      this.noticias.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    });
  }
}
