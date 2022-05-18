import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/services/crud.service';
@Component({
  selector: 'app-contents-delete',
  templateUrl: './contents-delete.component.html',
  styleUrls: ['./contents-delete.component.css']
})
export class ContentsDeleteComponent implements OnInit {
  idAtual: any;
  nome: any;
  constructor(private crudService:CrudService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((objeto:any) =>{
      this.idAtual = objeto.id;
      this.nome = objeto.nome;
    })


    
  }

  DeleteFile(){

    Swal.fire({  
      icon: 'warning',  
      title: 'Deseja Continuar ? Essa ação não poderá ser desfeita !',  
      showCancelButton:true,
      confirmButtonText:"Salvar",
      cancelButtonText:"Cancelar",
      confirmButtonColor:"#228B22",
      cancelButtonColor:"#DC143C"
    }).then(result => {
      if(result.isConfirmed){
        this.crudService.deleteTopico(this.idAtual);
        Swal.fire('Tópico Removido com Sucesso')

        setTimeout(function(){ 
          window.location.href = "/";
        }, 5000);
      }
        
    })

  
  }

}
