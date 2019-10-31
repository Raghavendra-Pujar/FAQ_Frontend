import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public faqList = [];
  public token;
  public btn = true;
  constructor(public app: AppServiceService, public toastr: ToastrService,public cookieService: CookieService,
    public router: Router ) { }

  ngOnInit() {
    this.getList();
    this.token = this.cookieService.get('authToken');
    if(this.token){
      this.btn = false;
    }else{
      this.btn = true;
    }
  }

  public getList = ()=>{
    this.app.getFaqList().subscribe((apiResponse: any)=>{
      if(apiResponse.status === 200){
        this.faqList = apiResponse.data;
      }else{
        this.toastr.info('No Faqs are present','Use create button to start adding')
      }
    })
  }

  public ConfirmDelete()
  {
    var x = confirm("Are you sure you want to delete?");
    if (x)
        return true;
    else
      return false;
  }


  public delete = (faqId)=>{
    console.log(faqId)
    if(this.ConfirmDelete()){
    this.app.deleteFaq(faqId).subscribe((apiResponse: any)=>{
      console.log(apiResponse)
      if(apiResponse.status === 200){
        console.log(apiResponse.message);
        this.toastr.success('FAQ has been deleted permanently',)
        this.getList();
      }
    })
  }else{
    
  }
    
  }

  public logout=()=>{
    this.cookieService.deleteAll();
    this.router.navigate(['/login'])
  }

}
