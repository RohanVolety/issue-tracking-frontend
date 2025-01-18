import { SignupResponse,SignupForm } from './../../models/signup.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
      // Initialize the signup form with validation
      this.signupForm = this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          profileImage: [''],
          role: ['', Validators.required]
      });
  }

  onSubmit(): void {
      if (this.signupForm.valid) {
          const formValue: SignupForm = this.signupForm.value;

          // Make the HTTP POST request to submit the form
          this.http.post<SignupResponse>('http://localhost:8081/api/users', formValue)
              .subscribe(
                  (response: SignupResponse) => {
                      console.log('Signup successful:', response);
                      this.router.navigate(['/login']);
                  },
                  (error) => {
                      console.error('Signup failed:', error);
                      alert('Signup failed. Please try again.');
                  }
              );
      } else {
          console.log('Form is invalid');
      }
  }
}

