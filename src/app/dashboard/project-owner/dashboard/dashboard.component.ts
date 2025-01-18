import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../shared/project.service';
import { IssueService } from '../../shared/issue.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { Project, IssueForm } from '../../../models/issueForm.model';
import { FilterIssue, Issue } from '../../../models/issue.model';
import { TeamMember } from '../../../models/insights.model';
@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  issues: FilterIssue[] = [];
  filteredIssues: FilterIssue[] = [];
  selectedProjectId: number | null = null;
  selectedPriority: string = '';
  selectedAssignee: string = '';
  projectOwnerName: string = sessionStorage.getItem('userName') || 'Project Owner';
  startDate!: Date;
  endDate!: Date;
  issueCategories: string[] = ['TO-DO', 'DEVELOPMENT', 'TESTING', 'COMPLETED'];
  teamMembers: TeamMember[] = [];

  constructor(
      private projectService: ProjectService,
      private issueService: IssueService,
      private userService: UserService,
      private router: Router
  ) {}

  ngOnInit(): void {
      this.loadProjects();
      this.loadAllTeamMembers();
  }

  loadProjects(): void {
      this.projectService
          .getProjectsByOwnerId(Number(sessionStorage.getItem('userId')))
          .subscribe((projects: Project[]) => {
              this.projects = projects;
              if (projects.length > 0) {
                  this.selectedProjectId = projects[0].project_id;
                  this.startDate = projects[0].startDate;
                  this.endDate = projects[0].endDate;
                  this.loadIssues();
              }
          });
  }

  loadIssues(): void {
      if (this.selectedProjectId) {
          this.issueService.getIssuesByProjectId(this.selectedProjectId)
              .subscribe((issues: FilterIssue[]) => {
                  this.issues = issues;
                  this.issues.forEach((issue) => {
                      this.userService.getUserById(issue.assignee).subscribe((user) => {
                          issue.assigneeName = user.name;
                          issue.assigneeImage = user.profile;
                          issue.createdDate = new Date(issue.createdOn);
                      }); 
                  });
                  this.applyFilters();
              });
      }
  }

  loadAllTeamMembers(): void {
      const ownerId = Number(sessionStorage.getItem('userId'));
      this.issueService.getIssuesByOwnerId(ownerId).subscribe((issues) => {
          const assigneeIds = [...new Set(issues.map((issue) => issue.assignee))];
          this.teamMembers = [];
          assigneeIds.forEach((id: number) => {
              this.userService.getUserById(id).subscribe((member) => {
                  this.teamMembers.push(member);
              });
          });
      });
  }

  getAssigneeName(assigneeId: number): string {
      const member = this.teamMembers.find(
          (member) => member.user_id === assigneeId
      );
      return member ? member.name : 'Unknown';
  }

  getAssigneeImage(assigneeId: number): string {
      const member = this.teamMembers.find(
          (member) => member.user_id === assigneeId
      );
      return member ? member.profile : 'default-image-url';
  }

  onProjectChange(event: Event): void {
    //   this.selectedProjectId = Number(event.target.value);
    const target = event.target as HTMLSelectElement;
    this.selectedProjectId = Number(target.value);
      const selectedProject = this.projects.find(
          (project) => project.project_id === this.selectedProjectId
      );
      if (selectedProject) {
          this.startDate = selectedProject.startDate;
          this.endDate = selectedProject.endDate;
      } else {
          console.warn('No project found with the selected ID');
      }
      this.loadIssues();
      this.loadAssigneesForProject();
  }

  loadAssigneesForProject(): void {
    if (this.selectedProjectId) {
        this.issueService.getIssuesByProjectId(this.selectedProjectId)
            .subscribe((issues: Issue[]) => {
                const assigneeIds = [...new Set(issues.map((issue) => issue.assignee))];
                this.teamMembers = [];
                assigneeIds.forEach((id: number) => {
                    this.userService.getUserById(id).subscribe((member) => {
                        this.teamMembers.push(member);
                    });
                });
            });
    }
}
  filterByPriority(event: Event): void {
      const target = event.target as HTMLSelectElement;
      this.selectedPriority = target.value;
      this.applyFilters();
  }

  filterByAssignee(event: Event): void {
      const target = event.target as HTMLSelectElement;
      this.selectedAssignee = target.value;
      this.applyFilters();
  }

  applyFilters(): void {
      let filteredIssues = this.issues;

      if (this.selectedPriority) {
          filteredIssues = filteredIssues.filter(issue => issue.priority === this.selectedPriority);
      }

      if (this.selectedAssignee) {
          filteredIssues = filteredIssues.filter(issue => issue.assigneeName === this.selectedAssignee);
      }

      this.filteredIssues = filteredIssues;
  }

  getIssuesByCategory(category: string): FilterIssue[] {
      return this.filteredIssues.filter((issue) => issue.status === category);
  }

  filterIssues(searchText: string): void {
      this.filteredIssues = this.issues.filter(
          (issue) =>
              issue.summary.includes(searchText) ||
              issue.description.includes(searchText)
      );
  }
  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'low';
      case 'medium':
        return 'medium';
      case 'high':
        return 'high';
      default:
        return '';
    }
  }
//   viewInsights(): void {
//       this.router.navigate(['/insights', this.selectedProjectId]);
//   }
viewInsights(): void {
  
    this.router.navigate(['/view-insights']);
}
  viewIssueDetails(issueId: number): void {
      this.router.navigate(['/issue-details', issueId]);
  }

  formatDate(dateString: string): string {
      const date = new Date(dateString);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
  }
}
