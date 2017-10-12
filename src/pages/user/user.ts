import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import { LoginPage } from '../login/login';
import { UserModel } from './user.model';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {
  public user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public nativeStorage: NativeStorage,
    public googlePlus: GooglePlus) {}

  ionViewCanEnter(){
    this.nativeStorage.getItem('user')
    .then((data) => {
      this.user = {
        name: data.name,
        email: data.email,
        picture: data.picture
      };
    }, (error) => {
      console.log(error);
    });
  }

  doGoogleLogout(){
    this.googlePlus.logout().then((response) => {
      this.nativeStorage.remove('user');
      this.navCtrl.setRoot(LoginPage);
    },(error) => {
      console.log(error);
    })
  }

}
