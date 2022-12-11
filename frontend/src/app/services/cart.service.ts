import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodID: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodID);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodID: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodID);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = cartItem.food.price * quantity;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (previousSum, currentItem) => previousSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (previousSum, currentItem) => previousSum + currentItem.quantity,
      0
    );

    const cartJSON = JSON.stringify(this.cart);

    localStorage.setItem('cart', cartJSON);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJSON = localStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : new Cart();
  }
}
