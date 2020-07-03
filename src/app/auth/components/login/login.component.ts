import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoriesService } from 'src/app/core/services/repositories.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private repositoriesService: RepositoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.repositoriesService.authService.login(value.userName, value.password)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
