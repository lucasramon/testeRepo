import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { sign } from 'fake-jwt-sign'; // For fakefakeAuthProvider only
import * as decode from 'jwt-decode';
import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Role } from '../enums/role.enum';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}
interface IServerAuthResponse { accessToken: string; }

const defaultAuthStatus = { isAuthenticated: false, userRole: Role.None, userId: null };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatus = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);

  constructor(
    private storageService: StorageService,
    private router: Router) {

    // this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus));

  }


  private fakeAuthProvider(email: string, password: string): Observable<IServerAuthResponse> {

    const authStatus = {
      isAuthenticated: true,
      userId: 'e4d1bc2ab25c',
      userRole: email.toLowerCase().includes('admin') ? Role.Admin :
                email.toLowerCase().includes('user') ? Role.User : Role.None,

    } as IAuthStatus;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', { expiresIn: '1h', algorithm: 'none' })
    } as IServerAuthResponse;

    return of(authResponse);
  }

  login(email: string, password: string): Observable<IAuthStatus> {

    this.logout();

    const loginResponse = this.fakeAuthProvider(email, password).pipe(
      map(value => {
        return decode(value.accessToken) as IAuthStatus;
      }),
      // catchError(transformError)
    );

    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        return observableThrowError(err);
      });
    return loginResponse;
  }

  logout(): void {
    this.authStatus.next(defaultAuthStatus);
  }

}
