
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
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
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
