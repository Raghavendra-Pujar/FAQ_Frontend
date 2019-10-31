import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public title;
  public description;
  
  constructor(public toastr: ToastrService, public app: AppServiceService,public router: Router,
    public cookie: CookieService) { }

  ngOnInit() {
  }
  
  public createFaq = ()=>{
    this.app.createFaq(this.title,this.description).subscribe((apiResponse:any)=>{
      console.log(apiResponse);
      if(apiResponse.status === 200){
        this.toastr.success('FAQ has been created successfully');
        this.router.navigate(['/dashboard'])
      }else{
        this.toastr.error(apiResponse.message);
      }
    })
  }


  public logout=()=>{
    this.cookie.deleteAll();
    this.router.navigate(['/login'])
  }
}
