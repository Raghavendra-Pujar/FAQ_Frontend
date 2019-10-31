import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public urlFaqId;
  public title;
  public description;
  public faqId;
  constructor(public app: AppServiceService, public route: ActivatedRoute, public router: Router,
    public toastr: ToastrService, public cookieService: CookieService) { }

  ngOnInit() {
    this.urlFaqId = this.route.snapshot.paramMap.get('faqId');
    console.log(this.urlFaqId)
    this.getDetails();

  }

  public getDetails =()=>{
    this.app.getDetails(this.urlFaqId).subscribe((apiResponse:any)=>{
      console.log(apiResponse)

      if(apiResponse.status === 200){
        this.title = apiResponse.data.title;
        this.description = apiResponse.data.description;
        this.faqId = apiResponse.data.faqId;
        console.log(this.faqId)
    }else{
      this.toastr.error('FAQ details not found')
    }
    })
  }


  public edit=()=>{
    this.app.edit(this.faqId,this.title,this.description).subscribe((apiResponse:any)=>{
      console.log(apiResponse)
      if(apiResponse.status === 200){
        this.toastr.success('Updated Successfully')
        this.router.navigate(['/dashboard']);
      }else{
        this.toastr.error('Some error occured')
      }
    })
  }

  public logout=()=>{
    this.cookieService.deleteAll();
    this.router.navigate(['/login'])
  }

}
