import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent implements OnInit {
  food!: Food;

  constructor(
    route: ActivatedRoute,
    private foodSrv: FoodService,
    private cartSrv: CartService,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      if (params.id) this.food = this.foodSrv.getFoodById(params.id);
    });
  }

  ngOnInit(): void {
    console.log(this.food);
  }

  addToCart() {
    this.cartSrv.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
