import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project,ProjectInsights } from '../../models/projectService.model';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'http://localhost:8082/api/projects';

  constructor(private http: HttpClient) {}

  getProjectsByOwnerId(ownerId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/owner/${ownerId}`);
  }
  getProjectById(projectId:number):Observable<Project>{
    return this.http.get<Project>(`${this.baseUrl}/${projectId}`)
  }
  createProject(projectData: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, projectData);
}
getProjectInsights(projectId: number): Observable<ProjectInsights> {
  return this.http.get<Project>(`${this.baseUrl}/${projectId}/insights`);
}
}
 