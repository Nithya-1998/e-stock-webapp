import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User';
import { UserCred } from '../UserCred';
import { UserToken } from '../UserToken';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = "http://35.153.50.113:8080";
  userToken : any;
  token: any;
  loggedIn = false;
  redirectUrl = '/';
  'emailId': string;
  constructor(private httpClient: HttpClient) {}
  authenticate(userCred: UserCred): Observable<any> {
    this.emailId = userCred.emailId;
    localStorage.setItem("emailId", userCred.emailId);
    return this.httpClient.post<any>(this.baseUrl+"/users/getUser", userCred);
  }

  addUser(user: User) {
    user.isLoggedIn = true;
    user.role = "USER";
    console.log(user);
    console.log(this.baseUrl, user);
    return this.httpClient.post(this.baseUrl + "/users/addUser", user);
  }

  logOutUser(user: User) : Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      }),
    };
    return this.httpClient.post<any>(this.baseUrl + "/users/logout", user, httpOptions);

  }
  public setUserToken(userToken: UserToken){
    this.userToken = userToken
  }

  public setJwt(token: any) {
    this.token = token;
  }
  public getJwt(){
    return this.token;
  }

  public setEmailId(emailId: any) {
    this.emailId = emailId;
  }
  public getEmailId(){
    return this.emailId;
  }

  public getUserToken(){
    return this.userToken;
  }

  public logout() {
    this.userToken = null;
  }

  public setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn
  }

  public getLoggedIn(){
    return this.loggedIn;
  }
}
