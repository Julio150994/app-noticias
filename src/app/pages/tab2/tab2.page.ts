import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  // Para mostrar los encabezados
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    // value es para establecer el valor de los datos
    this.segment.value = this.categorias[0];// es el botón business

    //Implementamos el método del servicio en la parte lógica
    this.noticiasService.getTopHeadlinesCategoria(this.categorias[0])
    .subscribe(resp => {
      console.log(resp);
      // Y mostramos las noticias por Categoría
      this.noticias.push(...resp.articles);
    });
  }

  // Método para realizar el evento
  cambioCategoria(event) {
    // Si cambiamos de categoría tenemos que resetear el array
    // ya que si no lo hacemos las anexa al final del mismo
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
    .subscribe(resp => {
      console.log(resp);

      if(resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }
}
