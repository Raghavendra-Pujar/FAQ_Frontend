import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName;
  public password;
  constructor(public app: AppServiceService,  private cookieService: CookieService,public router:Router,
    public toastr: ToastrService ) { }

  ngOnInit() {
  }

  public login = ()=>{
    console.log(this.userName)
    
    this.app.login(this.userName,this.password).subscribe((apiResponse:any)=>{
      console.log(apiResponse);

      if(apiResponse.status === 200){
        this.cookieService.set('authToken',apiResponse.data.authToken);
        this.toastr.success('Login Successfull');
        this.router.navigate(['/dashboard'])
      }else{
        this.toastr.error(apiResponse.message);
      }
    },(err)=>{
      this.toastr.error('UserName/Password invalid')
    })

  }


}
