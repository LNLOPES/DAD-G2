import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
        text: "Informe o nome da nova Matéria:",
        input: 'text'
      }).then(result => {
        if(result.isConfirmed)
          Swal.fire('Matéria Criada com sucesso')
      })
  
  }

  alertDeletePaste(){

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
        Swal.fire('Matéria Removida com Sucesso')
      }
        
    })

  
  }

}
