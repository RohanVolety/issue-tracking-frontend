import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../shared/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
@Component({
    selector: 'app-create-project',
    imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,SidebarComponent],
    templateUrl: './create-project.component.html',
    styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
    projectForm: FormGroup;
    isSubmitting = false;
    projectOwnerName = sessionStorage.getItem('userName') || 'ndjdjd';
    projectOwnerId: number;
    

    constructor(
        private fb: FormBuilder,
        private projectService: ProjectService,
        private router: Router
    ) {
      const userId = sessionStorage.getItem('userId');
      this.projectOwnerId = userId ? parseInt(userId, 10) : 0;
      this.projectForm = this.fb.group({
        projectName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9\s\-\/|.]*$/)]],
        projectOwner: [{ value: this.projectOwnerId, disabled: true }, Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      }, { validator: this.dateLessThan('startDate', 'endDate') });
    }

    ngOnInit(): void {}

    onSubmit(): void {
        if (this.projectForm.valid) {
            this.isSubmitting = true;
            const projectData = this.projectForm.value;
            this.projectService.createProject(projectData).subscribe(
                response => {
                    console.log('Project created successfully:', response);
                    this.isSubmitting = false;
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    console.error('Error creating project:', error);
                    this.isSubmitting = false;
                    alert('Failed to create project. Please try again.');
                }
            );
        }
    }

    onReset(): void {
        this.projectForm.reset();
    }

    dateLessThan(startDate: string, endDate: string) {
        return (formGroup: FormGroup) => {
          const start = formGroup.controls[startDate];
          const end = formGroup.controls[endDate];
          
          if (end.errors && !end.errors['dateLessThan']) {
            return;
          }
      
          if (start.value && end.value && new Date(start.value) > new Date(end.value)) {
            end.setErrors({ dateLessThan: true });
          } else {
            end.setErrors(null);
          }
        };
      }
      
}
