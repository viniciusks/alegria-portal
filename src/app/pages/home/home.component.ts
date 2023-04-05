import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {}

  verifyIdentity() {
    let identity = this._userService.getIdentity();

    if (identity != null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/']);
  }
}
