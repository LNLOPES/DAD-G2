import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: '',
    senha: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService,private crudService:CrudService ) { }

  ngOnInit(): void {
    if ( this.auth.isAuthenticated() ) {
      this.router.navigate(['home']);  
    } 
  }

  onSubmit(): void {
    let value = this.loginForm.value;
    if ( value.email == "") {
      alert("Login não informado");
      return;
    }

    if ( value.senha == "") {
      alert("Senha não informada");
      return;
    }

  


    this.crudService.Autenticacao(value).subscribe(
      (data:any) => {
        localStorage.setItem("token", data.bearer);
        localStorage.setItem("id", data.id); 

        if ( data.id == 11 ) {
          localStorage.setItem("login", "aluno");
          this.router.navigate(['home']);
    
        } else if ( data.id == 10 ) {
          localStorage.setItem("login", "professor");
          this.router.navigate(['home']);
        } else if ( data.id == 8 ) {
          localStorage.setItem("login", "cordenador");
          this.router.navigate(['home']);
        } else {
          alert("Login não encontrado");
    
          return;
        }


      },
      (error: any)=> {
        console.error('ERROR: ',error);
        alert("Login não encontrado");
      }
      );
    

  
 
    
  }
}
