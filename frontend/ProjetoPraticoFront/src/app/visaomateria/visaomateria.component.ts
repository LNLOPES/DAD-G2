import { Component, OnInit } from '@angular/core';
import { Pasta } from '../Pasta';
import {FormGroup,FormControl } from '@angular/forms'
import 'DataTables.net';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/services/crud.service';
import { Topicos } from './../models/placeholder.model';
import { Contents } from './../models/placeholder.model';
import { ActivatedRoute } from '@angular/router';

const generateID = () => Math.round(Math.random() * 1000)
@Component({
  selector: 'app-visaomateria',
  templateUrl: './visaomateria.component.html',
  styleUrls: ['./visaomateria.component.css']
})


export class VisaomateriaComponent implements OnInit {

  topicos: any;
  contents: any;
  erro: any;
  idAtual: any;
  nome:any;
  constructor(private crudService:CrudService,private route:ActivatedRoute) { 
    this.getter();
    this.getterContents();

    

  }

  ngOnInit(): void {
    this.route.params.subscribe((objeto:any) =>{
      this.idAtual = objeto.id;
      this.nome = objeto.nome;
    })

    
  }
/* 
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

  
   
  } */




  alertNewTopico2(){
      var nm = "loadingalerta" ;
      $("#" + nm).remove();
     
      Swal.fire({  
        icon: 'warning',  
        title: 'Criar Novo Tópico ?',  
        showCancelButton:true,
        confirmButtonText:"Salvar",
        cancelButtonText:"Cancelar",
        confirmButtonColor:"#228B22",
        cancelButtonColor:"#DC143C",
        text: "Informe o Nome do Novo Tópico:",
        input: 'text'
      }).then(result => {
        if(result.isConfirmed){
          
          if(result.value == null || result.value == ''){
            alert("Por favor, preencha o campo Nome da matéria")
            return
          }

          Swal.fire('Tópico Criado com sucesso')
        
        }
          
      })
  }

  alertNewTopico(){
    var nm = "loadingalerta" ;
    $("#" + nm).remove();
   
    Swal.fire({  
      icon: 'warning',  
      title: 'Criar Novo Tópico ?',   
      showCancelButton:true,
      confirmButtonText:"Salvar",
      cancelButtonText:"Cancelar",
      confirmButtonColor:"#228B22",
      cancelButtonColor:"#DC143C",
      html:'<div class="form-group">'+
          '<label for="comment">Informe o nome do tópico: <br>'+'</label><br>'+
          '<input class="form-control" id="nomeTopico"></input><br><br>'+
          '<label for="comment">Informe a descrição do tópico: <br>'+'</label><br>'+
          '<input class="form-control" id="descTopico"></input><br><br>'+
        '</div>',
    }).then(result => {
      if(result.isConfirmed){
        var descMateria:string = $('#descTopico').val() as string;
        let nome:string = $('#nomeTopico').val() as string;
      
        var fd = new FormData();
        fd.append('title', nome);
        fd.append('description', descMateria);
        fd.append('disciplineId', this.idAtual);


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
            this.crudService.criaTopicos(fd);
            
            //this.crudService.criaMateria(object);
            Swal.fire('Matéria Criada com sucesso')
          }

        })
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

  altertable(id:any){
    
    var aux = [];
    var tabela = '';
    var button = '';
    this.contents.forEach((marca:any, indice:any) => {
      if(marca.topicId === id){

        tabela += `<tr>
        <td>${marca.title}</td>
        <td>${marca.description}</td>
        <td><a href="${marca.url}" target="_blank"><span class="glyphicon glyphicon-cloud-upload" style="color:blue;" aria-hidden="true"></span></a>
        <a href="/contents/${marca.id}/${marca.title}" ><span class="glyphicon glyphicon-trash" style="color:red;" aria-hidden="true"></span></a></td>
     </tr>`;

      button = `<a href="/contents-upload/${marca.topicId}/${marca.disciplineId}" class="btn btn-info  btn-lg ajuste7"  type="button" id="button-addon2"><span class="glyphicon glyphicon-cloud-upload" style="color:white;" aria-hidden="true"></span><font color="white"> Enviar Arquivo</font></a>`;
      }
     
      $('#example').html(tabela);
      $('#exrt').html(button);
  });

    
  }
  
  getter(){
    this.crudService.getTopicos().subscribe(
      (data:any) => {
        this.topicos = data;
        console.log("datta que recebemos",data);
        console.log("A variavel que preenchemos",this.topicos);
      },
      (error: any)=> {
        this.erro = error;
        console.error('ERROR: ',error);
      }
      );
  }

  getterContents(){
    this.crudService.getContents().subscribe(
      (data:any) => {
        this.contents = data;
        console.log("datta que recebemos",data);
        console.log("A variavel que preenchemos",this.contents);
      },
      (error: any)=> {
        this.erro = error;
        console.error('ERROR: ',error);
      }
      );
  }


  
}









