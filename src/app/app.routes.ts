import { Comment } from './models/comment.model';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/project-owner/dashboard/dashboard.component';
import { CreateProjectComponent } from './dashboard/project-owner/create-project/create-project.component';
import { CreateIssueComponent } from './dashboard/project-owner/create-issue/create-issue.component';
import { IssueDetailsComponent } from './dashboard/project-owner/issue-details/issue-details.component';
import { EditIssueComponent } from './dashboard/project-owner/edit-issue/edit-issue.component';
import { ViewInsightsComponent } from './dashboard/project-owner/view-insights/view-insights.component';
import { AssigneeDashboardComponent } from './dashboard/assignee/assignee-dashboard/assignee-dashboard.component';
import { AssigneeIssueDetailsComponent } from './dashboard/assignee/assignee-issue-details/assignee-issue-details.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'create-project',component:CreateProjectComponent},
  {path:'create-issue',component:CreateIssueComponent},
  {path: 'issue-details/:id',component:IssueDetailsComponent},
  { path: 'edit-issue/:id', component: EditIssueComponent } ,
  { path: 'view-insights', component: ViewInsightsComponent },
  { path: 'assignee-dashboard', component: AssigneeDashboardComponent},
  {path:'assignee-issue-details/:id',component:AssigneeIssueDetailsComponent}
];
