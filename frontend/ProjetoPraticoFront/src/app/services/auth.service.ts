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
    return localStorage.getItem('login') == 'professor';
  }

  public logout() {
    localStorage.clear();
  }
}