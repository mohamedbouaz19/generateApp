import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private _http:HttpClient) { }

  addClass(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/class',data);
  }
  getClassList():Observable<any>{
    return this._http.get("http://localhost:3000/class");
  }
  updateClass(id:number, data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/class/${id}`,data);
  }
  deleteClass(id: number):Observable<any>{
    return this._http.delete(`http://localhost:3000/class/${id}`);
  }

}
