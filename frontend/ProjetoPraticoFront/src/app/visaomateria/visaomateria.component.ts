import { Component, OnInit } from '@angular/core';
import { Pasta } from '../Pasta';
import {FormGroup,FormControl } from '@angular/forms'
import 'DataTables.net';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

const generateID = () => Math.round(Math.random() * 1000)
@Component({
  selector: 'app-visaomateria',
  templateUrl: './visaomateria.component.html',
  styleUrls: ['./visaomateria.component.css']
})

export class VisaomateriaComponent implements OnInit {

  pastas: Pasta[];
  formulario:any;
  constructor() { }

  ngOnInit(): void {
    this.ExibirPastas();
    this.formulario = new FormGroup({
      id: new FormControl(),
      nome : new FormControl(),
    });
  }

  CadastrarProduto(): void{

    Swal.fire({  
      icon: 'warning',  
      title: 'Tem Certeza que Deseja Criar uma Nova Pasta ?',  
      showCancelButton:true,
      confirmButtonText:"Salvar",
      cancelButtonText:"Cancelar",
      confirmButtonColor:"#228B22",
      cancelButtonColor:"#DC143C"
    }).then(result => {
      if(result.isConfirmed){
        this.formulario.value.id = generateID();
        const pasta: Pasta = this.formulario.value;
        this.pastas.push(pasta);
        localStorage.setItem("BD",JSON.stringify(this.pastas));
        this.formulario.reset();
        Swal.fire('Pasta Criada com Sucesso')

      }
        
    })
  
  }

  ExibirPastas() : void{
    
    if(localStorage.getItem('BD')){
      this.pastas = JSON.parse(localStorage.getItem('BD'));
    }
    else{
      this.pastas = [];
    }
  }

  RemovePasta(id:number) : void{//remover n ta pronto
    
    Swal.fire({  
      icon: 'warning',  
      title: 'Tem Certeza que Deseja Excluir a Pasta ?',  
      showCancelButton:true,
      confirmButtonText:"Salvar",
      cancelButtonText:"Cancelar",
      confirmButtonColor:"#228B22",
      cancelButtonColor:"#DC143C"
    }).then(result => {
      if(result.isConfirmed){
        const items = JSON.parse(localStorage.getItem('BD'));
        const filtered = items.filter((item:any) => item.id !== id);
        localStorage.setItem('BD', JSON.stringify(filtered));
        location.reload();
        Swal.fire('Pasta Removida com Sucesso')

      }
        
    })

  
   
  }




  alertNewPasta(){
      var nm = "loadingalerta" ;
      $("#" + nm).remove();
     
      Swal.fire({  
        icon: 'warning',  
        title: 'Criar Nova Pasta ?',  
        showCancelButton:true,
        confirmButtonText:"Salvar",
        cancelButtonText:"Cancelar",
        confirmButtonColor:"#228B22",
        cancelButtonColor:"#DC143C",
        text: "Informe o nome da nova Pasta:",
        input: 'text'
      }).then(result => {
        if(result.isConfirmed){
          Swal.fire('Pasta Criada com sucesso')
          if(result.value == null || result.value == ''){
            alert("Por favor, preencha o campo Nome da matéria")
            return
          }
        
        }
          
      })
  }

  alertDeletePaste(){

    Swal.fire({  
      icon: 'warning',  
      title: 'Tem Certeza que Deseja Excluir o Arquivo ?',  
      showCancelButton:true,
      confirmButtonText:"Salvar",
      cancelButtonText:"Cancelar",
      confirmButtonColor:"#228B22",
      cancelButtonColor:"#DC143C"
    }).then(result => {
      if(result.isConfirmed){
        Swal.fire('Arquivo Removido com Sucesso')
      }
        
    })

  
  }

  alertNewFile(){
    var nm = "loadingalerta" ;
    $("#" + nm).remove();
   
    Swal.fire({  
      icon: 'warning',  
      title: 'Enviar um Novo Arquivo ?',  
      customClass: 'swal-wide',
      showCancelButton:true,
      confirmButtonText:"Salvar",
      cancelButtonText:"Cancelar",
      confirmButtonColor:"#228B22",
      cancelButtonColor:"#DC143C",
      text: "Selecione a Pasta:",
      input: 'select',
      inputOptions: {
        '1': 'Imagens',
        '2': 'Slides',
        '3': 'Atividades'
      }
    }).then(result => {
      if(result.isConfirmed)
        Swal.fire({
          icon: 'warning',  
          title: 'Upload de Arquivo',  
          customClass: 'swal-wide',
          showCancelButton:true,
          confirmButtonText:"Salvar",
          cancelButtonText:"Cancelar",
          confirmButtonColor:"#228B22",
          cancelButtonColor:"#DC143C",
          text: "Selecione o Arquivo:",
          input: 'file'
        })
    })
  }
  
  
}





$(document).ready(function() {


  $('#example').DataTable( {
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
  } );


 
} );



