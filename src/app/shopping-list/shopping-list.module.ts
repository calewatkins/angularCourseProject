import { NgModule } from "@angular/core";

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent},
    ]),
    SharedModule
  ],
  exports: []
})
export class ShoppingListModule {}