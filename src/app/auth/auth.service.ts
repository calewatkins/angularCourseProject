import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExptimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      } 
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExptimer) {
      clearTimeout(this.tokenExptimer);
    }
    this.tokenExptimer = null;
  }

  autoLogout(expireDuration: number) {
    this.tokenExptimer = setTimeout(() => {
      this.logout();
    }, expireDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token, 
      new Date(userData._tokenExpDate)
    );
    
    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expDuration =  new Date(userData._tokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
      
      if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMsg);  
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMsg = 'This email already exists';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMsg = 'Incorrect email or password';
          break;
        case 'USER_DISABLED':
          errorMsg = 'The user account has been disabled by an administrator'
          break;
      }
      return throwError(errorMsg);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email, 
      userId, 
      token, 
      expireDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
