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
    return this.http.get('/api/Disciplines');
    
  }

  
 
  public criaMateria(mat:any){
    return this.http.post('/api/Disciplines',mat).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }

  public deleteMateria(id:any){
    return this.http.delete('/api/Disciplines/'+id).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }
  public deleteContent(id:any){
    return this.http.delete('/api/Contents/'+id).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }

  public createContent(mat:any) {
    return this.http.post('/api/Contents',mat).subscribe((data:any) => {
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
    return this.http.get('/api/Topics');

  }

  public deleteTopico(id:any){
    return this.http.delete('/api/Topics/'+id).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }

  

  public criaTopicos(mat:any){
    return this.http.post('/api/Topics',mat).subscribe((data:any) => {
      console.log(data);
    },
    (error: any)=> {
      console.error('ERROR: ',error);
    })
  }

  public getContents():Observable<any> {
    return this.http.get('/api/Contents');

  }

  public postContents(mat:any):Observable<any> {
    return this.http.get('/api/Contents',mat).pipe(take(1));

  }
}
