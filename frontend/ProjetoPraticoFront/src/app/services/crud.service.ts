import { HttpClient } from '@angular/common/http';
import { Materias } from './../models/placeholder.model';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class CrudService {

  constructor(private http: HttpClient) { }

  public getMaterias():Observable<any> {
    return this.http.get('http://juansilva-001-site1.btempurl.com/Disciplines');
    
  }

  public criaMateria(mat:any){
    return this.http.post('http://juansilva-001-site1.btempurl.com/Disciplines',mat).pipe(take(1));
  }

  public getTopicos():Observable<any> {
    return this.http.get('http://juansilva-001-site1.btempurl.com/Topics');

  }

  public criaTopicos(mat:any){
    return this.http.post('http://juansilva-001-site1.btempurl.com/Topics',mat).pipe(take(1));
  }

  public getContents():Observable<any> {
    return this.http.get('http://juansilva-001-site1.btempurl.com/Contents');

  }

  public postContents(mat:any):Observable<any> {
    return this.http.get('http://juansilva-001-site1.btempurl.com/Contents',mat).pipe(take(1));

  }
}
