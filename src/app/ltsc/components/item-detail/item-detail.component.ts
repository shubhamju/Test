import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LtscProductsService } from 'src/app/services/ltsc-products.service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  ItemSlug: string = ''; // Initialize with an empty string or any default value you prefer
  public ProdItemOutput:any;
  public AddWishOutPut:any=[];
  public cartOutPut:any=[];
  public PlaceOrderOutPut:any=[];
  public ItemDescOutPut:any=[];
  IsLeggedIn:boolean=false;
  GotItemDesc:boolean=false;
  selectedValues: { [key: number]: number } = {}; // To store selected values

  constructor(
    private route:ActivatedRoute,
    private ltsc:LtscProductsService,
    private router:Router,
    private decimalPipe: DecimalPipe,
    private authSrv:AuthService,
    private wishSrc:WishlistService,
    private toastr: ToastrService,
    private cartSrv:CartService,
    private orderSrv:OrderService,
    ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ItemSlug = params.get('slug') || ''; // Set the value from the parameter or use an empty string as fallback
      // Now you can use this.ItemSlug to fetch the details of the product from your data source and display them on the page.
      //console.log(this.ItemSlug)
      this.bindProdItem(this.ItemSlug);
    });
    
    this.IsLeggedIn=this.authSrv.IsLoggedIn();
  }
  CalculateDicountAmt(PrdPrice:number,DscntValue:number,DscntType:string):string | null{
    let clcAmt:number=0
    if(DscntType!=='')
    {
      if(DscntType==='Fixed'){
        clcAmt=PrdPrice-DscntValue
      }
      if(DscntType==='Percentage'){
        let PrtAmt:number
        PrtAmt=PrdPrice*DscntValue/100;
        clcAmt=PrdPrice-PrtAmt
      }
    }
    else{
      clcAmt=PrdPrice
    }
    return this.formatPrice(clcAmt);
  }
  formatPrice(price: number): string |null{
    if (typeof price === 'string') {
      price = parseFloat(price); // Convert string to number   
    }
    //console.log(this.decimalPipe.transform(price,'1.2-2'))
    return this.decimalPipe.transform(price,'1.2-2');
  }
  bindProdItem(getSlug:string){
    const dataArray={
      "ItemSlug": getSlug,
      "CategoryID": 0,
      "CategorySlug": "",
      "BillPlanID": "",
      "SegmentID":"",
      "MinPrice": 0,
      "MaxPrice": 0,
      "Discount":0
    }
    this.ltsc.getProductItems(dataArray).subscribe(res=>{
      this.ProdItemOutput=res;
      console.log(this.ProdItemOutput)
      if(this.ProdItemOutput.length<=0){
        //alert("hii")
        this.router.navigate(['page-not-found']);
      }
      else{
        console.log(this.ProdItemOutput)
        //alert("hi")
        //alert(this.ProdItemOutput[0].itemID)
        
        this.bindItemDesc(this.ProdItemOutput[0].itemID);
        if(this.ProdItemOutput.length>0){
          for (let i = 1; i <= this.ProdItemOutput.length; i++) {
            this.selectedValues[i] = 1;
          }

        }
      }
    });
  }
  bindItemDesc(ItemID:number){
    this.ltsc.getItemDesc(ItemID).subscribe(res=>{
      this.ItemDescOutPut=res;
      if(this.ItemDescOutPut.length>0){
        this.GotItemDesc=true
      }
      console.log(this.ItemDescOutPut)
    });
  }
  addToWishlist(product: any): void {
    this.wishSrc.addToWishlist(product);
    //console.log(product)
  }
  addWishItem(ItemID:number){
    
    if(this.IsLeggedIn){
      const GetUsrID=this.authSrv.getUserIDfromToken()
      const dataArray={
        "WID": 0,
        "ItemID": ItemID,
        "UserID": parseInt(GetUsrID, 10),
        "Action":1
      }
      this.wishSrc.AddWishAPI(dataArray).subscribe(res=>{
        this.AddWishOutPut=res;
        console.log(this.AddWishOutPut)
        if(this.AddWishOutPut[0]['status']=='success'){
          this.toastr.success(this.AddWishOutPut[0]['output_msg'], this.AddWishOutPut[0]['status']);
          this.addToWishlist(ItemID);
        }
        else{
          this.toastr.error(this.AddWishOutPut[0]['output_msg'], this.AddWishOutPut[0]['status']);
        }
      });
    }
    else{
      this.toastr.error("Logged in first", "Warning");
    }
  }
  addToCartlist(product: any): void {
    this.cartSrv.addToCartlist(product);
    //console.log(product)
  }
  addtocartfun(ItemID:number,Qty:number){
    const parsedQty = +Qty; // Convert Qty to number using type assertion
    console.log("Qty "+parsedQty,"Item ID "+ItemID)
    if(this.IsLeggedIn){
      const GetUsrID=this.authSrv.getUserIDfromToken()
      const dataArray={
        "ItemID": ItemID,
        "UserID": parseInt(GetUsrID, 10),
        "Quantity": parsedQty
      }
      this.cartSrv.addToCart(dataArray).subscribe(res=>{
        this.cartOutPut=res;
        console.log(this.cartOutPut)
        if(this.cartOutPut[0]['status']=='success'){
          this.toastr.success(this.cartOutPut[0]['output_msg'], this.cartOutPut[0]['status']);
          this.addToCartlist(ItemID)
        }
        else{
          this.toastr.error(this.cartOutPut[0]['output_msg'], this.cartOutPut[0]['status']);
        }
      });
    }
    else{
      this.toastr.error("Logged in first", "Warning");
    }
  }
  buyNowfun(ItemID:number,Qty:number){
    const parsedQty = +Qty; // Convert Qty to number using type assertion
    const GetUsrID=this.authSrv.getUserIDfromToken()
      const dataArray={
        "UserID": parseInt(GetUsrID, 10),
        "ProdItemID": ItemID,
        "Quantity": parsedQty,
        "IsBuyNow": 1
      }
      this.orderSrv.placeOrder(dataArray).subscribe(res=>{
        this.PlaceOrderOutPut=res;
        
        const getOutPut=this.PlaceOrderOutPut
        console.log(this.PlaceOrderOutPut)
        if(this.PlaceOrderOutPut>0){
          this.router.navigate(['/user/checkout/'+this.PlaceOrderOutPut])
        }
        else{
          this.toastr.error("Some error occured, try again", "Error");
        }
      });
  }
}
