import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  private url = environment.REST_URL;

  constructor(
    private http: HttpClient,
    private cookie: CookieService) { }

  public login(user: string, pass: string): Observable<any>{    
    let sha1 = require('sha1');
    let passEncoded = encodeURIComponent(btoa(sha1(pass.toLowerCase(), { asBytes: false, asString: true })));
    let uri = this.url + "login?username=" + user + "&password=" + passEncoded;   

    return this.http.get(uri, { responseType: 'text' });
  }

  public getUsers(){    
    let uri = this.url + "prg/framework/v1/users";
    let headers = this.getHeaders("get");
    return this.http.get(uri, {headers});
  }

  public alterUser(id, json): Observable<any>{
    let uri = this.url + "prg/framework/v1/users/" + id;
    let body = JSON.stringify(json);
    let headers = this.getHeaders("put");
    return this.http.put(uri, body, {headers});
  }

  public deleteUsuar(id): Observable<any>{
    let uri = this.url + "prg/framework/v1/users/" + id;
    let headers = this.getHeaders("put");
    return this.http.delete(uri, {headers});
  }

  public getHeaders(method): HttpHeaders{
    let jossoId = this.cookie.get('JSESSIONID');
    let headers = new HttpHeaders({'JOSSO_SESSIONID': 'JOSSO_SESSIONID=' + jossoId});

    if(method="put"){
      let headers = new HttpHeaders({'JOSSO_SESSIONID': 'JOSSO_SESSIONID=' + jossoId,'Content-Type':'application/json'});
    }

    return headers;
  }
}
