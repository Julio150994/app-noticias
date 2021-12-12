import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  categoriaActual = '';
  categoriaPage = 0;
  headlinesPage = 0;

  constructor(private http: HttpClient) { }

  // El parámetro query hace referencia al EndPoint de la API que llamaremos
  // <T> es un tipo genérico, como en Java
  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us`);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getTopHeadlinesCategoria(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    }
    else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
  }
}
