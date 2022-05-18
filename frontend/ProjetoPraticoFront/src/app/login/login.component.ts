import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService ) { }

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

    if ( value.login?.toLowerCase() == "aluno" ) {
      localStorage.setItem("login", "aluno");
    } else if ( value.login?.toLowerCase() == "professor" ) {
      localStorage.setItem("login", "professor");
    } else {
      alert("Login não encontrado");
      return;
    }

    this.router.navigate(['home']);
  }
}
