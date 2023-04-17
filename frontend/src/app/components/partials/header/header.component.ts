import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/Cart';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  user!: User;

  constructor(private cartSrv: CartService, private userSrv: UserService) {
    this.cartSrv.getCartObservable().subscribe((cart) => {
      this.cartQuantity = cart.totalCount;
    });
    this.userSrv.userObservable$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  logout(): void {
    this.userSrv.logout();
  }

  get isAuthenticated() {
    return this.user.token;
  }
}
