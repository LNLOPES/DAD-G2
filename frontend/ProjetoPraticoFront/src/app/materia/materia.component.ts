import { Materias } from './../models/placeholder.model';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  materias: any;
  erro: any;
  constructor(private crudService:CrudService) { 
    this.getter();
  }


  ngOnInit(): void {
    this.getter();
   
  }

  onSubmit(data:any){
    this.crudService.criaMateria(data);
  }
  alertNewMateria(){
      var nm = "loadingalerta" ;
      $("#" + nm).remove();
     
      Swal.fire({  
        icon: 'warning',  
        title: 'Criar Nova Matéria ?',  
        showCancelButton:true,
        confirmButtonText:"Salvar",
        cancelButtonText:"Cancelar",
        confirmButtonColor:"#228B22",
        cancelButtonColor:"#DC143C",
        html:'<div class="form-group">'+
            '<label for="comment">Informe o Nome da Matéria: <br>'+'</label><br>'+
            '<input class="form-control" id="nomeMateria"></input><br><br>'+
            '<label for="comment">Informe a Descrição da Matéria: <br>'+'</label><br>'+
            '<input class="form-control" id="descMateria"></input><br><br>'+
          '</div>',
      }).then(result => {
        if(result.isConfirmed){
          var descMateria:string = $('#descMateria').val() as string;
          let nome:string = $('#nomeMateria').val() as string;
        
          var fd = new FormData();
          fd.append('title', nome);
          fd.append('description', descMateria);
          fd.append('TeacherId', "dbfc2c9a-69f9-4c19-9fcc-846a9d557028");


          Swal.fire({  
            icon: 'warning',  
            title: 'Tem Certeza que Deseja Criar Esta Matéria ?',  
            showCancelButton:true,
            confirmButtonText:"Sim",
            cancelButtonText:"Cancelar",
            confirmButtonColor:"#228B22",
            cancelButtonColor:"#DC143C"
          }).then(result => {
            if(result.isConfirmed){
              console.log(fd)
              this.crudService.criaMateria(fd);
              
              //this.crudService.criaMateria(object);
              Swal.fire('Matéria Criada com sucesso')

              setTimeout(function(){ 
                location.reload();
              }, 5000);
              
            }

          })
        }
          
      })
  
  }

  alertDeleteMateria(id:any){

    Swal.fire({  
      icon: 'warning',  
      title: 'Tem Certeza que Deseja Excluir a Matéria ?',  
      showCancelButton:true,
      confirmButtonText:"Salvar",
      cancelButtonText:"Cancelar",
      confirmButtonColor:"#228B22",
      cancelButtonColor:"#DC143C"
    }).then(result => {
      if(result.isConfirmed){
        this.crudService.deleteMateria(id);
        Swal.fire('Matéria Removida com Sucesso')
        setTimeout(function(){ 
          location.reload();
        }, 5000);
        
      }
        
    })

  
  }

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

 $(document).ready(function() {

/*   $('#example2').DataTable( {
    
      responsive: true,
      "language": {
        "lengthMenu": "Mostrando _MENU_ registros por página",
        "zeroRecords": "Nenhum registro encontrado",
        "info": "Mostrando páginas _PAGE_ de _PAGES_",
        "infoEmpty": "Nenhum registro encontrado",
        "infoFiltered": "(Filtrados de _MAX_ registros)",
        "search": "Pesquisar",
        "paginate": {
          "next": "Próximo",
          "previous": "Anterior",
          "first": "Primeiro",
          "last": "Último"
      }
    }
  } ); */

 
  

 
} );
 