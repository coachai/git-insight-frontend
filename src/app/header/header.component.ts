import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
     name = 'anonymous';
  constructor(private myService:UserService) { }

  ngOnInit() {
    this.name = this.myService.username;
    console.log('Is User logged in',this.myService.getUserLoggedIn());
  }

}
