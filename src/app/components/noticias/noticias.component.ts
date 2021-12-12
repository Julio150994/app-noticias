import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  // Enviar los datos de las noticias al componente
  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false;

  constructor() { }

  ngOnInit() {}

}
