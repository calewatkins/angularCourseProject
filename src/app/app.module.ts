import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipe/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShoppingListModule
  ],
  providers: [ShoppingListService, 
              RecipeService, 
              {
                provide: HTTP_INTERCEPTORS, 
                useClass: AuthInterceptorService, 
                multi: true
              }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
