import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  public Autenticacao(fd:any) {
    return this.http.post('/api/Autenticacao/login',fd);
  }

  public criaMateria(mat:any){
    return this.http.post('http://juansilva-001-site1.btempurl.com/Disciplines',mat).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }

  public deleteMateria(id:any){
    return this.http.delete('http://juansilva-001-site1.btempurl.com/Disciplines/'+id).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }
  public deleteContent(id:any){
    return this.http.delete('http://juansilva-001-site1.btempurl.com/Contents/'+id).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }


  public createContent(mat:any) {
    return this.http.post('http://juansilva-001-site1.btempurl.com/Contents',mat).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }
  

 /*  getTopicosById(id:any){
    return this.http.get('/api/Topics/'+id);
  } */

  public getTopicos():Observable<any> {
    return this.http.get('http://juansilva-001-site1.btempurl.com/Topics');

  }

  public deleteTopico(id:any){
    return this.http.delete('http://juansilva-001-site1.btempurl.com/Topics/'+id).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }

  

  public criaTopicos(mat:any){
    return this.http.post('http://juansilva-001-site1.btempurl.com/Topics',mat).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }

  public getContents():Observable<any> {
    return this.http.get('http://juansilva-001-site1.btempurl.com/Contents');

  }

  public postContents(mat:any):Observable<any> {
    return this.http.get('http://juansilva-001-site1.btempurl.com/Contents',mat).pipe(take(1));

  }
}
