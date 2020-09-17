import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { HomePage } from './home/home.page';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  homePage: HomePage

  TOAST_DURATION = 2000
  NEWS_MODIFIED_MSG = `News successfully modified!`
  NEWS_DELETED_MSG = `News successfully deleted!`
  ADD_NEWS_MSG = 'Add a news!'
  ADD_NEWS_ERROR_MSG = 'Please insert correct values'

  TITLE_NAME = 'title'
  AUTHOR_NAME = 'author'
  NUMBER_NAME = 'number'

  constructor(
    private alertController: AlertController,
    private toastController: ToastController) { }

  async presentAddedNewsToast(news) {
    const toast = await this.toastController.create({
      message: `News N°${news.number} added!`,
      duration: this.TOAST_DURATION
    });
    toast.present();
  }

  async presentModifiedToast() {
    const toast = await this.toastController.create({
      message: this.NEWS_MODIFIED_MSG,
      duration: this.TOAST_DURATION
    });
    toast.present();
  }

  async presentErrorAddingNews() {
    const toast = await this.toastController.create({
      message: this.ADD_NEWS_ERROR_MSG,
      duration: this.TOAST_DURATION
    });
    toast.present();
  }

  async presentDeletedToast() {
    const toast = await this.toastController.create({
      message: this.NEWS_DELETED_MSG,
      duration: this.TOAST_DURATION
    });
    toast.present();
  }

  async presentAlertAddingNews() {
    const alert = await this.alertController.create({
      header: this.ADD_NEWS_MSG,
      inputs: [
        {
          name: this.TITLE_NAME,
          type: 'text',
          placeholder: 'Add title'
        },
        {
          name: this.AUTHOR_NAME,
          type: 'text',
          placeholder: 'Add the author'
        },
        {
          name: this.NUMBER_NAME,
          type: 'number',
          placeholder: 'The news number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Add',
          handler: (data) => {
            this.homePage.addNewNews(data);
          }
        }
      ]
    });

    await alert.present();
  }

}
