import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../shared/project.service';
import { IssueService } from '../../shared/issue.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CreateIssueResponse, IssueForm,Project } from '../../../models/issueForm.model';
import { Issue } from '../../../models/issue.model';
@Component({
    selector: 'app-create-issue',
    imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,SidebarComponent],
    templateUrl: './create-issue.component.html',
    styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  issueForm!: FormGroup; 
  isSubmitting = false;
  projects: Project[] = [];

  constructor(
      private fb: FormBuilder,
      private projectService: ProjectService,
      private issueService: IssueService,
      private router: Router
  ) {
      this.issueForm = this.fb.group({
          summary: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9\s\-\/|.]*$/)]],
          type: ['', Validators.required],
          project: ['', Validators.required],
          description: ['', Validators.maxLength(150)],
          priority: ['', Validators.required],
          assignee: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
          tags: ['', Validators.maxLength(100)],
          storyPoint: ['', [Validators.required, this.primeNumberValidator]],
          sprint: ['', Validators.required],
          status: ['', Validators.required]
      });
  }

  ngOnInit(): void {
      this.loadProjects();
  }

  loadProjects(): void {
      const userId = Number(sessionStorage.getItem('userId'));
      this.projectService.getProjectsByOwnerId(userId).subscribe((projects: Project[]) => {
          this.projects = projects;
      });
  }

  primeNumberValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      if (value <= 1) return { primeNumber: true };
      for (let i = 2; i < value; i++) {
          if (value % i === 0) return { primeNumber: true };
      }
      return null;
  }

  onSubmit(): void {
      if (this.issueForm.valid) {
          this.isSubmitting = true;
          const currentDate = new Date().toISOString();
          const userId = Number(sessionStorage.getItem('userId'));
          const issueData: Issue = {
              ...this.issueForm.value,
              createdOn: currentDate,
              lastUpdated: currentDate,
              createdBy:userId
              
          };
          console.log(issueData);
          this.issueService.createIssue(issueData).subscribe(
              () => {
                  this.isSubmitting = false;
                  this.router.navigate(['/dashboard']);
              },
              (error) => {
                  console.error('Error creating issue:', error);
                  this.isSubmitting = false;
                  alert('Failed to create issue. Please try again.');
              }
          );
      }
  }

  onReset(): void {
      this.issueForm.reset();
  }
}