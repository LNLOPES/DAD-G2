import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
  idAtual: any;
  nome: any;
  constructor(private crudService:CrudService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((objeto:any) =>{
      this.idAtual = objeto.id;
      this.nome = objeto.nome;
    })


    
  }

  refresh(){
    window.location.href = "/";
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
        this.crudService.deleteContent(this.idAtual);
        Swal.fire('Arquivo Removido com Sucesso')

        setTimeout(function(){ 
          window.location.href = "/";
        }, 5000);
      }
        
    })

  
  }

}
