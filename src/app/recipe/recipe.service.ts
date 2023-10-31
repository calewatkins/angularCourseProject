import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();


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

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}