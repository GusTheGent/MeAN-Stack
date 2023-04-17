import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL } from '../shared/constants/URLS';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartSrv: CartService
  ) {}

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          alert('Successfully logged in ' + user.name);
        },
        error: (errorResponse) => {
          console.log(errorResponse.error);
          alert('Error: ' + errorResponse.error);
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    this.cartSrv.clearCart();
    localStorage.removeItem('User');
    this.router.navigateByUrl('/login');
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem('User', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userInJSONFormat = localStorage.getItem('User');
    if (userInJSONFormat) return JSON.parse(userInJSONFormat) as User;
    return new User();
  }
}
