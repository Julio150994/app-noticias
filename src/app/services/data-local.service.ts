import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage,
      private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    // Si find() encuentra la noticia la guarda en "existe"
    // si no lo pondrá a "undefined"
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      // En el caso de que las noticias existan
      this.noticias.unshift(noticia);
      this.storage.set('favoritos',this.noticias);
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    // Comprobamos si existe "favoritos"
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos',this.noticias);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });

    toast.present();
  }
}
