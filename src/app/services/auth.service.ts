import { StorageService } from "./storage.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { sign } from "fake-jwt-sign"; // For fakefakeAuthProvider only
import * as decode from "jwt-decode";
import {
  BehaviorSubject,
  Observable,
  of,
  throwError as observableThrowError,
  throwError,
} from "rxjs";
import { map } from "rxjs/operators";
import { Role } from "../enums/role.enum";

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}
interface IServerAuthResponse {
  accessToken: string;
}

const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null,
};

const credentials = {
  login: "admin@email.com",
  password: "test123",
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authStatus = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);

  constructor(private storageService: StorageService, private router: Router) {
    this.authStatus.subscribe((authStatus) =>
      this.storageService.setItem("authStatus", authStatus)
    );
  }

  public userIsLoggedIn(): boolean {
    const jwt = this.storageService.getItem("jwt");
    return jwt ? true : false;
  }

  private fakeAuthProvider(
    email: string,
    password: string,
    validCredentials: boolean
  ): Observable<IServerAuthResponse> {
    let authStatus;
   

    if (validCredentials) {
      authStatus = {
        isAuthenticated: true,
        userId: "e4fg65abf5c",
        userRole: email.toLowerCase().includes("admin")
          ? Role.Admin
          : email.toLowerCase().includes("user")
            ? Role.User
            : Role.None,
      } as IAuthStatus;
    } else {
      authStatus = {
        isAuthenticated: false

      } as IAuthStatus;
    }

    const authResponse = {
      accessToken: sign(authStatus, "secret", {
        expiresIn: "1h",
        algorithm: "none",
      }),
    } as IServerAuthResponse;

    return of(authResponse);
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();

   const credentialsOk = credentials.login && password == credentials.password
      
      const loginResponse = this.fakeAuthProvider(email, password,credentialsOk).pipe(
        map((value) => {
          this.storageService.setItem("jwt", value.accessToken);
          return decode(value.accessToken) as IAuthStatus;
        })
      );

      loginResponse.subscribe(
        (res) => {
          this.authStatus.next(res);
        },
        (err) => {
          this.logout();
        }
      );

      return loginResponse;
    
  }

  logout(): void {
    this.storageService.removeItem("jwt");
    this.authStatus.next(defaultAuthStatus);
  }
}
