import { HeaderComponent } from './../../shared/header/header.component';
import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../shared/issue.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../../shared/user.service';
import { Issue ,FilterIssue} from '../../../models/issue.model';

@Component({
    selector: 'app-assignee-dashboard',
    imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,SidebarComponent,HeaderComponent],
    templateUrl: './assignee-dashboard.component.html',
    styleUrls: ['./assignee-dashboard.component.css']
})
export class AssigneeDashboardComponent implements OnInit {
    userId: number;
    issues: FilterIssue[] = [];
    filteredIssues: FilterIssue[] = [];
    searchText: string = '';
    issueCategories: string[] = ['TO-DO', 'DEVELOPMENT', 'TESTING', 'DONE'];

    constructor(private issueService: IssueService, private router: Router,
        private userService: UserService,
    ) {
        this.userId = Number(sessionStorage.getItem('userId'));
    }

    ngOnInit(): void {
        this.loadIssues();
    }

    // loadIssues(): void {
    //     this.issueService.getIssuesByAssignee(this.userId).subscribe(issues => {
    //         this.issues = issues;
    //         this.filteredIssues = issues;
    //     });
    // }
    loadIssues(): void {
        this.issueService.getIssuesByAssignee(this.userId).subscribe(issues => {
            this.issues = issues;
            this.filteredIssues = issues;
            console.log(this.issues);
            this.issues.forEach(issue => {
                this.userService.getUserById(issue.assignee).subscribe(user => {
                    issue.assigneeName = user.name;
                    issue.assigneeImage = user.profile;
                    issue.createdDate = new Date(issue.createdOn);                    
                });
            });
        });
    }

    // filterIssues(): void {
    //     const searchTextLower = this.searchText.toLowerCase();
    //     this.filteredIssues = this.issues.filter(issue =>
    //         issue.summary.toLowerCase().includes(searchTextLower) ||
    //         issue.description.toLowerCase().includes(searchTextLower)
    //     );
    // }
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
    getIssuesByCategory(category: string): any[] {
        return this.filteredIssues.filter(issue => issue.status.toUpperCase() === category.toUpperCase());
    }

    viewIssueDetails(issueId: number): void {
        this.router.navigate(['/assignee-issue-details', issueId]);
    }
}
