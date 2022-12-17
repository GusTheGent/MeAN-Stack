import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodSrv: FoodService, route: ActivatedRoute) {
    let foods$: Observable<Food[]>;
    route.params.subscribe((params) => {
      if (params.searchTerm) foods$ = this.foodSrv.getSearch(params.searchTerm);
      else if (params.tag) foods$ = this.foodSrv.getAllFoodsByTag(params.tag);
      else foods$ = this.foodSrv.getAll();

      foods$.subscribe((data) => {
        this.foods = data;
      });
    });
  }

  ngOnInit(): void {}
}
