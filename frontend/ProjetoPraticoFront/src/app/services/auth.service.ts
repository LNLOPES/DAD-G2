import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    return localStorage.getItem('login') != null;
  }

  public isAluno(): boolean {
    return localStorage.getItem('login') == 'aluno';
  }

  public isProfessor(): boolean {
    return localStorage.getItem('login') == 'professor' || localStorage.getItem('login') == 'cordenador';
  }

  public isCordenador(): boolean {
    return localStorage.getItem('login') == 'cordenador';
  }

  public isPermissaoAcesso(role: string): boolean {
    if (role == 'professor') {
      return localStorage.getItem('login') == 'professor' || localStorage.getItem('login') == 'cordenador';
    }

    if (role == 'cordenador') {
      return localStorage.getItem('login') == 'cordenador';
    }

    return false;
  }

  public logout() {
    localStorage.clear();
  }
}