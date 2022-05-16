import { Materias } from './../../models/placeholder.model';
import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  materias = new Materias();
  erro: any;
  constructor(private crudService:CrudService) { 
    this.getter();
  }
 
  ngOnInit() {}

  getter(){
    this.crudService.getMaterias().subscribe(
    (data:Materias) => {
      this.materias = data;
      console.log("datta que recebemos",data);
      console.log("A variavel que preenchemos",this.materias);
    },
    (error: any)=> {
      this.erro = error;
      console.error('ERROR: ',error);
    }
    );
  }

}
