import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { ProjectService } from '../../shared/project.service';
import { IssueService } from '../../shared/issue.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Project } from '../../../models/issueForm.model';
import { ProjectOwner,TeamMember,Insight } from '../../../models/insights.model';
import { Issue } from '../../../models/issue.model';
  
@Component({
  selector: 'app-view-insights',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,SidebarComponent],
  templateUrl: './view-insights.component.html',
  styleUrls: ['./view-insights.component.css']
})


export class ViewInsightsComponent implements OnInit {
  userId: number;
  projects: Project[] = [];
  selectedProjectId: number | null = null;
  insights!: Insight;
  teamMembers: TeamMember[] = [];
  totalIssues: number = 0;
  projectOwner!: ProjectOwner;

  constructor(
      private route: ActivatedRoute,
      private projectService: ProjectService,
      private userService: UserService,
      private issueService: IssueService
  ) {
      this.userId = Number(sessionStorage.getItem('userId'));
  }

  ngOnInit(): void {
      this.loadProjects();
      this.loadProjectOwner();
  }

  loadProjects(): void {
      this.projectService.getProjectsByOwnerId(this.userId).subscribe(projects => {
          this.projects = projects;
          if (projects.length > 0) {
              this.selectedProjectId = projects[0].project_id;
              this.loadInsights();
              this.loadTeamMembers();
          }
      });
  }

  onProjectChange(): void {
      if (this.selectedProjectId) {
          this.loadInsights();
          this.loadTeamMembers();
      }
  }

  loadInsights(): void {
      if (this.selectedProjectId) {
          this.issueService.getIssuesByProjectId(this.selectedProjectId).subscribe(issues => {
              this.insights = this.processIssues(issues);
              this.totalIssues = issues.length;
          });
          console.table(this.insights);         
      }
  }

  processIssues(issues: Issue[]): Insight {
      const statusCounts = {
          TO_DO: 0,
          IN_PROGRESS: 0,
          DONE: 0,
          TESTING: 0
      }; 

      issues.forEach(issue => {
          if (issue.status === 'TO-DO') {
              statusCounts.TO_DO++;
          } else if (issue.status === 'DEVELOPMENT') {
              statusCounts.IN_PROGRESS++;
          } else if (issue.status === 'COMPLETED') {
              statusCounts.DONE++;
          } else if (issue.status === 'TESTING') {
              statusCounts.TESTING++;
          }
      });

      return statusCounts;
  }

  loadTeamMembers(): void {
      if (this.selectedProjectId) {
          this.issueService.getIssuesByProjectId(this.selectedProjectId).subscribe(issues => {
              const assigneeIds = [...new Set(issues.map(issue => issue.assignee))];
              this.teamMembers = [];
              assigneeIds.forEach((id: number) => {
                  this.userService.getUserById(id).subscribe(member => {
                      this.teamMembers.push({
                          ...member,
                          role: 'Assignee'
                      });
                      console.table(this.teamMembers);
                  });
              });
          });
      }
  }

  loadProjectOwner(): void {
      this.userService.getUserById(this.userId).subscribe(owner => {
          this.projectOwner = {
              ...owner,
              role: 'Project Owner'
          };
          console.table(this.projectOwner);
      });
  }
}