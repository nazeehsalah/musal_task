import { Observable } from "rxjs"

export class TestHelper {
  getSuccessResponse = (data: any, status: string) => {
    return {
      status: "success",
      result: data
    }
  }
  observeData = ((data: any, status: string): Observable<any> => {
    return new Observable<any>(obs => {
      obs.next(this.getSuccessResponse(data, status))
      obs.complete();
    })
  })
  observeError = ((message: string, status: string): Observable<any> => {
    return new Observable<any>(obs => {
      obs.next({ status, message })
      obs.complete();
    })
  })
}
