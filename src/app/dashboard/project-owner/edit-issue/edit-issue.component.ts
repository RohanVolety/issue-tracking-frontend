import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../shared/issue.service';
import { ProjectService } from '../../shared/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Project } from '../../../models/issueForm.model';

@Component({
    selector: 'app-edit-issue',
    imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,SidebarComponent],
    templateUrl: './edit-issue.component.html',
    styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {
    issueForm: FormGroup;
    isSubmitting = false;
    projects:Project[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private issueService: IssueService,
        private projectService: ProjectService,
        private router: Router
    ) {
        // this.issueForm = this.fb.group({
        //     summary: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        //     project: ['', Validators.required],
        //     type: ['', Validators.required],
        //     priority: ['', Validators.required],
        //     description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
        //     assignee: ['', Validators.required],
        //     sprint: ['', [Validators.required, Validators.min(1)]],
        //     status: ['', Validators.required],
        //     tags: [''],
        //     storyPoint: ['', [Validators.required, Validators.min(1)]]
        // });

        this.issueForm = this.fb.group({
          summary: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
          project: [{ value: '', disabled: true }, Validators.required],
          type: [{ value: '', disabled: true }, Validators.required],
          priority: ['', Validators.required],
          description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
          assignee: ['', Validators.required],
          sprint: [{ value: '', disabled: true }, Validators.required],
          status: ['', Validators.required],
          tags: [''],
          storyPoint: [{ value: '', disabled: true }, Validators.required]
        });
        
    }

    ngOnInit(): void {
        const issueId = this.route.snapshot.paramMap.get('id');
        if(issueId){
        this.loadIssueDetails(issueId);
        this.loadProjects();
    }else
    {
      console.log("issue id not found");
    }
  }

    loadIssueDetails(issueId: string): void {
        this.issueService.getIssueById(issueId).subscribe(issue => {
            this.issueForm.patchValue(issue);
        });
    }

    loadProjects(): void {
        const userId = Number(sessionStorage.getItem('userId'));
        this.projectService.getProjectsByOwnerId(userId).subscribe(projects => {
            this.projects = projects;
            console.table(this.projects);
        });
    } 

    onSubmit(): void {
        if (this.issueForm.valid) {
          this.isSubmitting = true;
          const issueId = this.route.snapshot.paramMap.get('id');
          if (issueId) {
            const issueData = {
              ...this.issueForm.value,
              lastUpdated: new Date().toISOString() 
            };
            console.log(issueData);
            this.issueService.updateIssue(issueId, issueData).subscribe(
              response => {
                console.log('Issue updated successfully:', response);
                this.isSubmitting = false;
                this.router.navigate(['/issue-details', issueId]);
              },
              error => {
                console.error('Error updating issue:', error);
                this.isSubmitting = false;
                alert('Failed to update issue. Please try again.');
              }
            );
          }
        }
      }
    onReset(): void {
        this.issueForm.reset();
    }
}
