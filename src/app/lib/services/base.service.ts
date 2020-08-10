import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BaseModel } from '../models/_base/baseModel';

export class BaseService<T extends BaseModel> {


  protected http: HttpClient;
  protected headers: HttpHeaders;
  protected cookieservice: CookieService;


  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn?: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.cookieservice = injector.get(CookieService);
  }

  getAll(subRoute?: string) {
    this.headers = this.HeadersAuthorization();
    return this.http.get( this.apiPath +subRoute , { headers: this.headers }).pipe(
      finalize(() => {
      }),
      catchError((error: Response) =>{
        return throwError(error);
      })
    );
  }


  getById(id: number) {
    this.headers = this.HeadersAuthorization();
    return this.http.get(this.apiPath + id , { headers: this.headers }).pipe(
      finalize(() => {
      }),
      catchError((error: Response) =>{
        return throwError(error);
      })
    );
  }

  getByLink(link: string) {
    this.headers = this.HeadersAuthorization();
    return this.http.get(link, { headers: this.headers }).pipe(
      finalize(() => {

      }),
      catchError((error: Response) =>{
        return throwError(error);
      })
    );
  }


  /**
  * Busca header para inserir nas requisições com autorização necessária
  *  */
  protected HeadersAuthorization(): HttpHeaders {
    const tceAuthToken = this.cookieservice.get('TceoAuth');
    if (tceAuthToken) {
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + tceAuthToken
      });
      return headers;
    };
  }

  protected HeaderFormData() {
    const tceAuthToken = this.cookieservice.get('TceoAuth');
    return {
      headers: new HttpHeaders({
        'Content-Disposition': 'form-data;',
        'Authorization': 'bearer ' + tceAuthToken
      })
    };
  }


  // PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): any {
    const resources: any = [];
    return resources;
  }
}
