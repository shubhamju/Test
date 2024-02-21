import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LtscProductsService } from 'src/app/services/ltsc-products.service';

@Component({
  selector: 'app-add-item-descriptions',
  templateUrl: './add-item-descriptions.component.html',
  styleUrls: ['./add-item-descriptions.component.css']
})
export class AddItemDescriptionsComponent implements OnInit {
  public ProdAddOutput:any=[];
  public GetItemDescOutput:any=[];
  
  public Isloading=false;
  public ItemFound=false;
  SetUserID:string='';
  // selectedValues: { [key: number]: number } = {}; // To store selected values


  myForm: FormGroup;

  public ItemOverviewEditor = ClassicEditor;
  public ItemOvervieweditorContent = ''; // This will hold the content from the editor

  public KeyFtrEditor = ClassicEditor;
  public KeyFtrContent = ''; // This will hold the content from the editor

  public LicenseEditor = ClassicEditor;
  public LicenseContent = ''; // This will hold the content from the editor

  public SpecificationEditor = ClassicEditor;
  public SpecificationContent = ''; // This will hold the content from the editor

  constructor(
    private ltsc:LtscProductsService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private authSrv:AuthService

  ){
    this.myForm = this.formBuilder.group({
      ItemID: ['', Validators.required],
    });
  }
  get formControls() {
    return this.myForm.controls;
  }
  ngOnInit(): void {
    this.bindProductItems();
    this.SetUserID=this.authSrv.getUserIDfromToken();
  }
  bindProductItems(){
    this.Isloading=true;
    const dataArray={
      "ItemSlug": "",
      "CategoryID": 0,
      "CategorySlug": "",
      "BillPlanID": "",
      "SegmentID":"",
      "MinPrice": 0,
      "MaxPrice": 0,
      "Discount":0
    }
    this.ltsc.getProductItems(dataArray).subscribe(res=>{
      this.ProdAddOutput=res;
      //console.log(this.ProdAddOutput)
      if(this.ProdAddOutput.length>0){
        this.Isloading=false;
        this.ItemFound=true;
        
      }
      else{
        this.ItemFound=false;
        this.Isloading=false;
      }
    });
  }
  savedata(){
    if(this.myForm.valid){
      this.Isloading=true;
      //console.log(this.ItemOvervieweditorContent); // Access the content here
      //console.log(this.myForm.value.ItemID)

      const dataArray={
        "ItemID": parseInt(this.myForm.value.ItemID, 10),
        "ItemOverview": this.ItemOvervieweditorContent,
        "KeyFeatures": this.KeyFtrContent,
        "LicensingOverview": this.LicenseContent,
        "ItemSpecifications": this.SpecificationContent,
        "AddedBy": parseInt(this.SetUserID, 10)
      }
      if(this.ItemOvervieweditorContent==""&&this.KeyFtrContent==""&&this.LicenseContent==""&&this.SpecificationContent==""){
        this.toastr.warning("Enter atleast any one", "Warning");
      }
      else{
        // console.log(dataArray)
        this.ltsc.manageItemDesc(dataArray).subscribe(res=>{
          this.ProdAddOutput=res;
          // console.log(this.ProdAddOutput)
          if(this.ProdAddOutput[0]['status']=='success'){
            this.toastr.success(this.ProdAddOutput[0]['output_msg'], this.ProdAddOutput[0]['status']);
            const getItemID=this.ProdAddOutput[0]['result']
            //console.log("hiii_"+getItemID)
            // this.bindProductItems();
            // this.bindItemDesc(parseInt(getItemID,10));
          }
          else{
            this.toastr.error("Some error occured, try again", "Error");
          }
        });
      }
      this.Isloading=false;
    }
    else{
      this.toastr.warning("Select product item firts", "Warning");
    }
      
  }
  onStateChange(event: Event) {
    //this.getcityOutPut=[];
    const selectedItem = (event.target as HTMLSelectElement).value;
    //console.log("Selected State_"+selectedItem)
    // this.bindCity(parseInt(selectedState, 10));
    this.bindItemDesc(parseInt(selectedItem,10));
  }
  bindItemDesc(ItemID:number){
    this.Isloading=true;
    this.ItemOvervieweditorContent = "";
    this.KeyFtrContent = "";
    this.LicenseContent = "";
    this.SpecificationContent =""; 

    this.ltsc.getItemDesc(ItemID).subscribe(res=>{
      this.GetItemDescOutput=res;
      if(this.GetItemDescOutput.length>0){
        //this.GotItemDesc=true
        this.ItemOvervieweditorContent=this.GetItemDescOutput[0].itemOverview
        this.KeyFtrContent=this.GetItemDescOutput[0].keyFeatures
        this.LicenseContent=this.GetItemDescOutput[0].licensingOverview
        this.SpecificationContent=this.GetItemDescOutput[0].itemSpecifications
      }
      //console.log(this.GetItemDescOutput)
    });
    //console.log(ItemID)
    this.Isloading=false;
  }
}
