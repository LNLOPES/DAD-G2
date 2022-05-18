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
    login: '',
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

    if ( value.login == "") {
      alert("Login não informado");
      return;
    }

    if ( value.senha == "") {
      alert("Senha não informada");
      return;
    }

  


    this.crudService.Autenticacao(value).subscribe(
      (data:any) => {
        localStorage.setItem("token", data.Bearer);
        localStorage.setItem("id", data.id);


      },
      (error: any)=> {
        console.error('ERROR: ',error);
      }
      );
    

    if ( value.login?.toLowerCase() == "aluno" ) {
      localStorage.setItem("login", "aluno");


    } else if ( value.login?.toLowerCase() == "professor" ) {
      localStorage.setItem("login", "professor");

    } else if ( value.login?.toLowerCase() == "cordenador" ) {
      localStorage.setItem("login", "cordenador");

    } else {
      alert("Login não encontrado");

      return;
    }

    this.router.navigate(['home']);
  }
}
