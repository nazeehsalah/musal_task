import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { UtilsService } from "@core/services/utils.service";
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public utils: UtilsService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.utils.showSpinner();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.utils.showError("Error", error.error ? error.error.message : error.message)
        return throwError(error);
      }),
      finalize(() => this.utils.hideSpinner())
    );
  }
}
