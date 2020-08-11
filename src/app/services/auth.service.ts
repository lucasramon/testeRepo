import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService: StorageService,
    private router: Router) { }

  loginUser(email: string, senha: string): void {
    
    // this.apiService.post('login', { Email: email, ChaveAcesso: senha }).subscribe(
    //   sucesso => {
    //     this.storageService.setItem('token', sucesso);
    //     this.buscarPerfilUsuario();
    //   },
    //   erro => {
    //     if(erro['statusCode'] != 500){
    //       this.uiService.exibirErro("Usuario e/ ou senha inválidos!");
    //     }
    //   }
    // );
  }
}
