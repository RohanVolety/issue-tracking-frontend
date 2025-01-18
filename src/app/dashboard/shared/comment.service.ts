import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment.model';
@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private baseUrl = 'http://localhost:8084/api/comments';

    constructor(private http: HttpClient) {}

    getCommentsByIssueId(issueId: string): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.baseUrl}/${issueId}`);
    }

    addComment(commentData: Comment): Observable<Comment> {
        return this.http.post<Comment>(this.baseUrl, commentData);
    }

    deleteComment(commentId: number): Observable<Comment> {
        return this.http.delete<Comment>(`${this.baseUrl}/delete/${commentId}`);
    }
}
