import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  formularioValido(): boolean {
    return (this.form.valid) ? true : false;
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
      { validators: this.samePassword }
    );
  }

  private samePassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ diferentPasswords: true });
    } else {
      return null;
    }
  }

  submit(): void {
    if (this.formularioValido()) {
      // this.apiService.post('usuarios', { Email: this.formulario.get('email').value, ChaveAcesso: this.formulario.get('senha').value }).subscribe(
      //   sucesso => {
      //     // this.uiService.exibirSucesso("Você foi cadastrado!");
      //     this.router.navigate(['/login']);
      //   },
      //   erro => {
      //     if (erro['statusCode'] != 500) {
      //       // this.uiService.exibirErro("Formulário inválido!");
      //     }
      //   }
      // );
    }
  }

}
