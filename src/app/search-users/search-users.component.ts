import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from '../search-users.service';
import { UserService } from '../user.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  place: string;
  language: string;
 
  results: any[] = []; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user
  private searchTermStream = new Subject<string>();
  name = 'anony';
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();

  constructor(private serachService: SearchUsersService,private user:UserService) {}
  ngOnInit() { this.name = this.user.username;
    this.clicks.pipe(
      debounceTime(500)
    ).subscribe(e => this.debounceClick.emit(e));
  }
 
  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
search(place: string, language: string) {
    this.selected = false;
    this.error_text = "";
    if (place || language) {
      this.place = place;
      this.language = language;
      this.serachService.getUsersByPlaceAndLanguage(place, language).subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.error_text = "Sorry! No Users found. Try again";
          console.error(error);
        }
      )
    }
  }

  getDetails(username: string) {
    this.serachService.getDetailsByUserName(username).subscribe(
      userDatils => {
        this.selectedUser = userDatils;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.error(error);
      }
    )
}

}