import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliesComponent } from './supplies/supplies.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { SupplyOrdersComponent } from './supply-orders/supply-orders.component';
import { ProductOrdersComponent } from './product-orders/product-orders.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { EmployeesComponent } from './employees/employees.component';
import { SkillsComponent } from './skills/skills.component';
import { ToolsComponent } from './tools/tools.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GenericTableComponent } from './generic-table/generic-table.component';

const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      { path: 'supply', component: SuppliesComponent },
      { path: 'product', component: ProductsComponent },
      { path: 'employee', component: EmployeesComponent },
      { path: 'tool', component: ToolsComponent },
      { path: 'shift', component: ShiftsComponent },
      { path: 'skill', component: SkillsComponent },
      { path: 'supplyOrder', component: SupplyOrdersComponent },
      { path: 'productOrder', component: ProductOrdersComponent },
      { path: 'schedule', component: ScheduleComponent },
      // { path: 'genericTable', component: GenericTableComponent }
    ]
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
