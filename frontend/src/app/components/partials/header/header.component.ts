import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;

  constructor(private cartSrv: CartService) {
    this.cartSrv.getCartObservable().subscribe((cart) => {
      this.cartQuantity = cart.totalCount;
    });
  }

  ngOnInit(): void {}
}
