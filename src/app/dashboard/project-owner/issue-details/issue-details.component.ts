import { Issue } from './../../../models/issue.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../shared/issue.service';
import { CommentService } from '../../shared/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Comment } from '../../../models/comment.model';

@Component({
    selector: 'app-issue-details',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, SidebarComponent],
    templateUrl: './issue-details.component.html',
    styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {
    issue!: Issue;
    comments: Comment[] = [];
    showAddComment = true;
    newCommentText = '';

    constructor(
        private route: ActivatedRoute,
        private issueService: IssueService,
        private commentService: CommentService,
        private router: Router
    ) {}

    ngOnInit(): void {
      const issueId = this.route.snapshot.paramMap.get('id');
      if (issueId) {
          this.loadIssueDetails(issueId);
          this.loadComments(issueId);
      } else {
          console.error('Issue ID is null');
      }
  }

    loadIssueDetails(issueId: string): void {
        this.issueService.getIssueById(issueId).subscribe(issue => {
            this.issue = issue;
        });
    }

    loadComments(issueId: string): void {
        this.commentService.getCommentsByIssueId(issueId).subscribe(comments => {
            this.comments = comments;
          
        });
    }

    toggleAddComment(): void {
        this.showAddComment = !this.showAddComment;
    }

    addComment(): void {
        if (this.newCommentText.trim()) {
          const issueId = Number(this.route.snapshot.paramMap.get('id'));
          const userId = Number(sessionStorage.getItem('userId'));
          const userName = sessionStorage.getItem('userName')||"User";
          const currentDate = new Date();
    
          const commentData = {
            createdDate: currentDate,
            description: this.newCommentText,
            issueId: issueId,
            userId: userId,
            userName: userName
          };
    
          this.commentService.addComment(commentData).subscribe(
            comment => {
              this.comments.push(comment);
              this.newCommentText = '';
              this.showAddComment = false;
            },
            error => {
              console.error('Error adding comment:', error);
            }
          );
        }
      }

    deleteComment(commentId: number): void {
        this.commentService.deleteComment(commentId).subscribe(() => {
            this.comments = this.comments.filter(comment => comment.comment_id !== commentId);
        });
    }

    editIssue(): void {
        this.router.navigate(['/edit-issue', this.issue.issue_id]);
    }
}
