import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DisabledRouteGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router){}
  canActivate():boolean {
    //console.log(this.auth.IsLoggedIn())
    if(this.auth.IsLoggedIn()){
      if(this.auth.getUserType()=="3"){
        return false;
      }else{
        return true;
      }
    }
    else{
      this.router.navigate(['/auth/login'])
      return false;
    }
    
  }
  
}
