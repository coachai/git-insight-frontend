import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
  private isUserLoggedIn;
  private getUserDetailsEndPoint = "https://api.github.com/users/";
  public username;
  
  constructor(private http: HttpClient) { 
    this.isUserLoggedIn = false;
  }
  
  setUserLoggedIn(){
    this.isUserLoggedIn = true;
    this.username = 'admin';
  }

  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }

  getUsername(username: string, password: string) {
    let url = `${this.getUserDetailsEndPoint}${username}`;
    
    return this.http.get(url)
    
    //      // .catch(this.handleError);
          .map(user => {
             // login successful if there's a jwt token in the response
             if (user) {
                 // store user details and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('currentUser', JSON.stringify(user));
             }

             return user;
         } );
} 
}
