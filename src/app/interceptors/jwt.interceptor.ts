import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const currentToken = this.authenticationService.currentTokenValue;
        if (currentToken && currentToken.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken.access_token}`
                },
                withCredentials: true
                
            });
        }

        return next.handle(request);
    }
}