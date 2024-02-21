import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiurlService } from './apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class LtscProductsService {
  private Productsdata: any[] = [];
  private CategorySlug: string = 'all';

  constructor(private http:HttpClient,private baseapi:ApiurlService) { }
  
  baseserverurl=this.baseapi.getApiBaseUrl();

  getCategorySlug(): string {
    return this.CategorySlug;
  }

  setCategorySlug(newData: string): void {
    this.CategorySlug = newData;
  }

  getProductCategory(){
    return this.http.get(this.baseserverurl+"LTSCProduct/getProductCategory");
  }
  manageProductCategory(prd:any){
    return this.http.post(this.baseserverurl+"LTSCProduct/manageProductCategory",prd);
  }
  manageProducts(prd:any){
    return this.http.post(this.baseserverurl+"LTSCProduct/manageProduct",prd);
  }
  GetProducts(prd:any){
    return this.http.post(this.baseserverurl+"LTSCProduct/getAllProducts",prd);
  }
  getSegment(){
    return this.http.get(this.baseserverurl+"LTSCProduct/getSegment");
  }
  manageProductItems(prd:any){
    return this.http.post(this.baseserverurl+"LTSCProduct/manageProductItems",prd);
  }
  getProductItems(prd:any){
    return this.http.post(this.baseserverurl+"LTSCProduct/GetProductItems",prd);
  }
  UploadProductItemImage(prd:any){
    return this.http.post(this.baseserverurl+"LTSCProduct/UploadItemImages",prd);
  }
  manageItemDesc(prd:any){
    return this.http.post(this.baseserverurl+"LTSCProduct/manageItemDesc",prd);
  }
  getItemDesc(ItemID: number) {
    const apiUrl = this.baseserverurl+`LTSCProduct/getItemDesc?ItemID=${ItemID}`;
    return this.http.get(apiUrl);
  }
}
