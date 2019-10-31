import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  public baseUrl = 'http://localhost:3000/api/v1'
  constructor(public http: HttpClient, private cookieService: CookieService ) { }

  public getFaqList = (): Observable<any>=>{
    return this.http.post(`${this.baseUrl}/faq/list`,'')
  }

  public createFaq = (title,description): Observable<any>=>{

    const params = new HttpParams()
    .set('title',title)
    .set('description',description)
    .set('authToken',this.cookieService.get('authToken'));
    return this.http.post(`${this.baseUrl}/faq/create`,params);
  }

  public deleteFaq = (faqId):Observable<any>=>{
    console.log(faqId)
    const params = new HttpParams()
    .set('faqId',faqId)
    .set('authToken',this.cookieService.get('authToken'));

    return this.http.post(`${this.baseUrl}/faq/remove`,params);
  }

  public getDetails = (faqId)=>{
    const params = new HttpParams()
    .set('faqId',faqId);

    return this.http.post(`${this.baseUrl}/faq/getFaq`,params);
  }

  public edit = (faqId,title,description) =>{
    const params = new HttpParams()
    .set('title',title)
    .set('description',description)
    .set('faqId',faqId)
    .set('authToken',this.cookieService.get('authToken'));
    

    return this.http.post(`${this.baseUrl}/faq/edit`,params);
  }

  public login = (userName,password):Observable<any>=>{
    const params = new HttpParams()
    .set('userName',userName)
    .set('password',password)

    return this.http.post(`${this.baseUrl}/users/login`,params);
  }
}
