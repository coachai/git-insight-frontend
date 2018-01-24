import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule,Routes} from '@angular/router';
import {UserService} from './user.service';
import { AuthguardGuard } from './authguard.guard';
import { SearchUsersComponent } from './search-users/search-users.component';
import { SearchUsersService } from './search-users.service';
const appRoutes:Routes = [
  {
    path:'',
    component:LoginFormComponent
  },
  { path:'dashboard',
    canActivate:[AuthguardGuard],
    component:DashboardComponent
  },
  { path:'search-users',
  canActivate:[AuthguardGuard],
  component:SearchUsersComponent
    
   }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    DashboardComponent,
    SearchUsersComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [UserService,AuthguardGuard,SearchUsersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
