import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): Food[] {
    return sample_foods;
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getFoodById(id: string): Food {
    return this.getAll().find((food) => food.id == id) ?? new Food();
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((food) => food.tags?.includes(tag));
  }

  getSearch(value: string): Food[] {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(value.toLowerCase())
    );
  }
}
