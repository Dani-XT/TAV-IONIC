import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions } from '@ionic/angular';
import { ModalController, ModalOptions} from '@ionic/angular';
import { ToastController, ToastOptions } from '@ionic/angular';
import { AlertController, AlertOptions } from '@ionic/angular';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);
  router = inject(Router);

  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingCtrl.create(opts);
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingCtrl.dismiss();
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

  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  //TODO: LocalStorage
  saveInLocalStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  } 

  removeFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }


  getPercentage(task: Task){
    let completeActivities = task.activities.filter(activities => activities.finished).length;
    let totalActivities = task.activities.length;
    let percentage = (100/totalActivities) * completeActivities;

    return parseInt(percentage.toString());
  }
}
