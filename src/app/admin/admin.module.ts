import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UsersComponent } from './components/users/users.component';
import { EnquirySingleComponent } from './components/enquiry/enquiry-single/enquiry-single.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { LtscProductsModule } from '../ltsc-products/ltsc-products.module';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { AddProductItemsComponent } from './components/add-product-items/add-product-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemDescriptionsComponent } from './components/add-item-descriptions/add-item-descriptions.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AdminComponent,
    TopBarComponent,
    SideBarComponent,
    FooterComponent,
    DashboardComponent,
    EnquiryComponent,
    UserAddComponent,
    UsersComponent,
    EnquirySingleComponent,
    ManageProductsComponent,
    ManageCategoryComponent,
    AddProductItemsComponent,
    AddItemDescriptionsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    LtscProductsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule
  ]
})
export class AdminModule { }
