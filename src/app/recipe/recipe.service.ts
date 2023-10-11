import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'This is for testing', 
      'https://clipground.com/images/clipart-food-photos.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potatoe', 5)
      ]
     ),
    new Recipe(
      'Test Recipe 2', 
      'This is also for testing', 
      'https://clipground.com/images/clipart-food-photos.jpg',
      [
        new Ingredient('Bread', 3),
        new Ingredient('Carrot', 14)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    //return a copy of the array
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}