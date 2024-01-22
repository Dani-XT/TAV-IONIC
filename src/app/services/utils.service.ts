import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ModalController, ModalOptions} from '@ionic/angular';
import { ToastController, ToastOptions } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);




  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  async presentModal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts);
    modal.present();
    const { data } = await modal.onWillDismiss();
    if(data) return data;
  }

  dismissModal(data?: any){
    return this.modalCtrl.dismiss(data);
  }

  saveInLocalStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string){
    return localStorage.getItem(key);
  }

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }
}
