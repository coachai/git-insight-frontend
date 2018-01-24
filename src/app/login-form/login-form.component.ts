import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  results: any = {};
  loading = false;
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit() {
  }

  loginUser(e){
       e.preventDefault();
       console.log(e);
       var username = e.target.elements[0].value;
       var email    = e.target.elements[1].value;
       
       this.userService.getUsername(username,email)
       .subscribe(
           data => {
               this.results = data;
             if(this.results.email == email || this.results.login == username)
            {this.userService.setUserLoggedIn();
              this.userService.username = username;
              this.router.navigate(['search-users']);
           
           //  this.router.navigate(['dashboard']);
            } this.loading = false;
           },
           error => {
               
               this.loading = false;
           });
       if(username=='admin'&& email=='admin')
       this.userService.setUserLoggedIn();
       this.router.navigate(['search-users']);
  }
  
}
