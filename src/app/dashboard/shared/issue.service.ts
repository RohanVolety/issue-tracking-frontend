import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterIssue, Issue } from '../../models/issue.model';
@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:8083/api/issues'; 

  constructor(private http: HttpClient) {}

  getIssuesByProjectId(projectId: number): Observable<FilterIssue[]> {
    return this.http.get<FilterIssue[]>(`${this.apiUrl}/project/${projectId}`);
  }

  getIssuesByAssignee(assigneeId: number): Observable<FilterIssue[]> {
    return this.http.get<FilterIssue[]>(`${this.apiUrl}/assignee/${assigneeId}`);
  }

  getIssuesByPriority(priority: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/priority/${priority}`);
  }
  createIssue(issueData: Issue): Observable<Issue> {
  return this.http.post<Issue>(this.apiUrl, issueData);
}
  getIssueById(issueId: string): Observable<Issue> {
  return this.http.get<Issue>(`${this.apiUrl}/${issueId}`);
}
updateIssue(issueId: string, issueData: Issue): Observable<Issue> {
  return this.http.put<Issue>(`${this.apiUrl}/${issueId}`, issueData);
}
getIssuesByOwnerId(ownerId: number): Observable<Issue[]> {
  return this.http.get<Issue[]>(`${this.apiUrl}/owner/${ownerId}`);
}

}
