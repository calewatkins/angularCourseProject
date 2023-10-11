import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is for testing', 'https://clipground.com/images/clipart-food-photos.jpg'),
    new Recipe('Test Recipe 2', 'This is also for testing', 'https://clipground.com/images/clipart-food-photos.jpg')
  ];

  constructor() { }

  getRecipes() {
    //return a copy of the array
    return this.recipes.slice();
  }
}


//what this should do
  //manage recipes