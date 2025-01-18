import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { IssueService } from '../../shared/issue.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    userId: number;
    userName: string;
    userEmail: string;
    userProfileImage: string;
    issueCount: number=0;
 
    constructor(private userService: UserService, private issueService: IssueService) {
        this.userId = Number(sessionStorage.getItem('userId'));
        this.userName = sessionStorage.getItem('userName') || '';
        this.userEmail = sessionStorage.getItem('userEmail') || '';
        this.userProfileImage = sessionStorage.getItem('userProfileImage') || '';
    }

    ngOnInit(): void {
        this.loadIssueCount();
    }

    loadIssueCount(): void {
        this.issueService.getIssuesByAssignee(this.userId).subscribe(issues => {
            this.issueCount = issues.length;
        });
    }

    logout(): void {
        sessionStorage.clear();
        window.location.href = '/login';
    }
}
