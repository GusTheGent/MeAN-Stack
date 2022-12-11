import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;

  constructor(private cartSrv: CartService) {
    this.cartSrv.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    console.log('Cart', this.cart);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartSrv.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantity: string): void {
    const newQuantity = parseInt(quantity);
    this.cartSrv.changeQuantity(cartItem.food.id, newQuantity);
  }
}
