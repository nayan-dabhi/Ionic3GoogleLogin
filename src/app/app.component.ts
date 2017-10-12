import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public googlePlus: GooglePlus) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: UserPage },
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.googlePlus.trySilentLogin({}).then((data) => {
        console.log(data);
        this.nav.setRoot(UserPage);
        this.splashScreen.hide();
      }, (error) => {
        this.nav.setRoot(LoginPage);
        this.splashScreen.hide();
      });

      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
