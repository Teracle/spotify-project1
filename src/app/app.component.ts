
/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: ____Maxim Nosov__ Student ID: _129458204_____ Date: ____04/03/2022____________
*
* Angular App (Deployed) Link: ___https://spotify-project1.vercel.app/newReleases______________________________________________
*
* User API (Heroku) Link: https://spotify-project1.vercel.app_______________________
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'web422-a6';
  searchString: String;
  token: any;

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { 
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch(): void {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
