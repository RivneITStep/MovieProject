import { ApiService } from './../core/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private apiService: ApiService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkRole(state.url);
    }

    checkRole(url: string): boolean {
        if (this.apiService.isAdmin()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}