import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodSrv: FoodService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      if (params.searchTerm)
        this.foods = this.foodSrv.getSearch(params.searchTerm);
      else if (params.tag)
        this.foods = this.foodSrv.getAllFoodsByTag(params.tag);
      else this.foods = this.foodSrv.getAll();
    });
  }

  ngOnInit(): void {}
}
