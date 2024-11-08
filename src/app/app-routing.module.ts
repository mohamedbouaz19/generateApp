import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropComponent } from './drop/drop.component';

const routes: Routes = [
  {path:'',component:DropComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
