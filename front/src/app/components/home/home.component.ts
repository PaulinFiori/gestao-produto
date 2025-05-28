import { Component, OnInit } from '@angular/core';
import { ROLE_ADMIN, ROLE_USER } from 'src/app/config/roles';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isAdmin: boolean = false;
  public isUser: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.loadUserInfo();
    this.checkPermissions();
  }

  checkPermissions() {
    this.isAdmin = this.userService.hasPermission(ROLE_ADMIN);
    this.isUser = this.userService.hasPermission(ROLE_USER);
  }

}
