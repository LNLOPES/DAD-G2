import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-contents-upload',
  templateUrl: './contents-upload.component.html',
  styleUrls: ['./contents-upload.component.css']
})
export class ContentsUploadComponent implements OnInit {
  idAtual: any;
  key: any;
  constructor(private crudService:CrudService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((objeto:any) =>{
      this.idAtual = objeto.id;
      this.key = objeto.key;
    })


    
  }

  onChange(event:any){

    var descMateria:string = $('#desc').val() as string;
    let nome:string = $('#nome').val() as string;

    if(event.target.files && event.target.files[0]){

      const img = event.target.files[0];

      var fd = new FormData();
      fd.append('title', nome);
      fd.append('description', descMateria);
      fd.append('file', img);
      fd.append('disciplineId', this.key);
      fd.append('topicId', this.idAtual);


      Swal.fire({  
        icon: 'warning',  
        title: 'Tem Certeza que Deseja Fazer o uploado do Arquivo ?',  
        showCancelButton:true,
        confirmButtonText:"Salvar",
        cancelButtonText:"Cancelar",
        confirmButtonColor:"#228B22",
        cancelButtonColor:"#DC143C"
      }).then(result => {
        if(result.isConfirmed){
          this.crudService.createContent(fd);
          Swal.fire('Arquivo Criado com Sucesso, bota reload nessas bagaça tudo ai') // estilizar e os crl
        }
          
      })

    }

    

  
  }

}
