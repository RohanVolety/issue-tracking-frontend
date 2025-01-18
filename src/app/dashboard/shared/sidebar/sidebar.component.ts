import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { IssueService } from '../issue.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userName ='';
  userEmail = '';
  userProfileImage = '';
  projectsCreatedCount: number = 0;
  issuesCreatedCount: number = 0;

  constructor(private router: Router,private projectService: ProjectService,
    private issueService: IssueService) {}
  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName') || 'null';
    this.userEmail = sessionStorage.getItem('userEmail') || 'null';
    this.userProfileImage = sessionStorage.getItem('userProfileImage') || 'null';
    const userId = Number(sessionStorage.getItem('userId'));
    this.loadProjectsCreatedCount(userId);
    this.loadIssuesCreatedCount(userId);
  }

  loadProjectsCreatedCount(userId: number): void {
    this.projectService.getProjectsByOwnerId(userId).subscribe(projects => {
        this.projectsCreatedCount = projects.length;
    });
}

loadIssuesCreatedCount(userId: number): void {
    this.issueService.getIssuesByOwnerId(userId).subscribe(issues => {
        this.issuesCreatedCount = issues.length;
    });
}

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}