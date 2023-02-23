import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

const url = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks = ()=>{
    return this.http.get(`${url}tasks`,  { observe: 'response' })
    .pipe(
      map(res=> {
        return res
      })
    );
  }

}
