import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { UsersComponent } from './components/users/users.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ProductsComponent } from '../ltsc-products/components/products/products.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { AddProductItemsComponent } from './components/add-product-items/add-product-items.component';
import { AddItemDescriptionsComponent } from './components/add-item-descriptions/add-item-descriptions.component';

const routes: Routes = [{ path: '', component: AdminComponent,
  children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'enquiry',component:EnquiryComponent},
    {path:'users',component:UsersComponent},
    {path:'add-user',component:UserAddComponent},
    {path:'manage-products',component:ManageProductsComponent},
    {path:'manage-category',component:ManageCategoryComponent},
    {path:'add-product-item',component:AddProductItemsComponent},
    {path:'add-item-description',component:AddItemDescriptionsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
