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
    if (window.location.href.indexOf('reload')==-1) {
      window.location.replace(window.location.href+'?reload');
    }
    
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
          title: 'Tem Certeza que Deseja Criar Este Tópico ?',  
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
            Swal.fire('Tópico Criado com sucesso')

            setTimeout(function(){ 
              location.reload();
            }, 5000);
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

  altertable(id:any,title:any){
    
    var aux = [];
    var tabela = ` <thead>
    <tr>
        <th>Nome</th>
        <th>Descricao</th>
        <th>Ação</th>
    </tr>
</thead>
<tbody>`;
    var button = '';
    this.contents.forEach((marca:any, indice:any) => {
      if(marca.topicId === id){

      
        tabela += `<tr>
        <td>${marca.title}</td>
        <td>${marca.description}</td>
        <td><a title="Download" href="${marca.url}" target="_blank"><span class="glyphicon glyphicon-cloud-upload" style="color:blue;font-size:13px;" aria-hidden="true"></span></a>
        <a title="Excluir" href="/contents/${marca.id}/${marca.title}" ><span class="glyphicon glyphicon-trash" style="color:red;font-size:13px;" aria-hidden="true"></span></a></td>
     </tr>`;

      button = `<a href="/contents-upload/${marca.topicId}/${marca.disciplineId}" class="btn btn-info  btn-lg ajuste7"  type="button" id="button-addon2"><span class="glyphicon glyphicon-cloud-upload" style="color:white;" aria-hidden="true"></span><font color="white"> Enviar Arquivo</font></a>
      <a href="/contents-delete/${marca.topicId}/${title}" class="btn btn-danger  btn-lg ajuste7"  type="button" id="button-addon2"><span class="glyphicon glyphicon-trash" style="color:white;" aria-hidden="true"></span><font color="white"> Apagar Tópico</font></a>`;
      }
      tabela += `</tbody>`;
     
      $('#example').html(tabela);
      $('#exrt').html(button);
  });

    if(button == ''){
      tabela = '';
      $('#example').html(tabela);
      button = `<a href="/contents-upload/${id}/${this.idAtual}" class="btn btn-info  btn-lg ajuste7"  type="button" id="button-addon2"><span class="glyphicon glyphicon-cloud-upload" style="color:white;" aria-hidden="true"></span><font color="white"> Enviar Arquivo</font></a>
                <a href="/contents-delete/${id}/${title}" class="btn btn-danger  btn-lg ajuste7"  type="button" id="button-addon2"><span class="glyphicon glyphicon-trash" style="color:white;" aria-hidden="true"></span><font color="white"> Apagar Tópico</font></a>`;
      $('#exrt').html(button);
    }
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









