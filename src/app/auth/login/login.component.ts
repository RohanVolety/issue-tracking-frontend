import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../dashboard/shared/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { LoginForm,LoginResponse,UserDetails } from '../../models/login.model';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})


export class LoginComponent {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  onSubmit(loginForm: NgForm):void {
      if (loginForm.valid) {
          const { email, password, role } = loginForm.value;

          const url = `http://localhost:8081/api/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`;

          this.http.post<LoginResponse>(url, {})
              .subscribe(
                  (response: LoginResponse) => {
                      if (response && response.email === email && response.password === password && response.role === role) {
                          const userId = response.user_id;
                          console.log('Login successful:', response);
                          sessionStorage.setItem('userId', userId.toString());
                          sessionStorage.setItem('userEmail', email);
                          sessionStorage.setItem('userRole', role);

                          this.userService.getUserById(userId).subscribe((userDetails: UserDetails) => {
                              sessionStorage.setItem('userName', userDetails.name);
                              sessionStorage.setItem('userProfileImage', userDetails.profile);

                              if (role === 'Assignee') {
                                  this.router.navigate(['/assignee-dashboard']);
                              } else if (role === 'Project Owner') {
                                  this.router.navigate(['/dashboard']);
                              } else {
                                  alert('Invalid role.');
                              }
                          });
                      } else {
                          alert('Invalid login credentials.');
                      }
                  },
                  (error) => {
                      console.error('Login failed:', error);
                      alert('Login failed. Please try again.');
                  }
              );
      }
  }
}