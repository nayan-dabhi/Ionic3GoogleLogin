import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import { UserPage } from '../user/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  public mLoader: any;

  constructor(
    public navCtrl: NavController,
    public googlePlus: GooglePlus,
    public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController
  ) { }

  doGoogleLogin() {
    this.mLoader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.mLoader.present();

    this.googlePlus.login({}).then((user) => {
      console.log(user);

      this.mLoader.dismiss();

      this.nativeStorage.setItem('user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      }).then(() => {
        this.navCtrl.setRoot(UserPage);
      }, (error) => {
        console.log("storeage error", error);
      });
    }, (err) => {
      console.log(err);
      this.mLoader.dismiss();
    });

  }

}
