import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import jwt_decode from "jwt-decode";
import { JwtToken } from '../models/placeholder.model';

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

  token: string = "";

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private auth: AuthService,
              private crudService:CrudService,
              private actRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.processaAutorizacao();
  }

  public processaAutorizacao() {
    this.actRoute.queryParams
    .subscribe(params => {
      console.log(params)
      try {
        if ( params['token'] == null && this.auth.isAuthenticated() ||
         (params['token'] != null && params['token'] == localStorage.getItem("token"))) {
          this.router.navigate(['home']);
          return;
        }
        const objToken:JwtToken = jwt_decode(params['token']);

        localStorage.setItem("token", params['token']);
        localStorage.setItem("id", objToken.nameid); 

        if ( objToken.role.toLowerCase() == "aluno" ) {
          localStorage.setItem("login", "aluno");
          this.router.navigate(['home']);
        } else if ( objToken.role.toLowerCase() == "professor" ) {
          localStorage.setItem("login", "professor");
          this.router.navigate(['home']);
        } else if ( objToken.role.toLowerCase() == "administrador" ) {
          localStorage.setItem("login", "cordenador");
          this.router.navigate(['home']);
        } else {
          alert("Tipo de usuário não identificado");
          return;
        }

      } catch (Error) {
        alert("Não foi possível processar o token: " + params['token'] )
      }
    });
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
