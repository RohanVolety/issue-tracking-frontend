export interface IssueForm {
    summary: string;
    type: string;
    project: string;
    description: string;
    priority: string;
    assignee: number;
    tags?: string;
    storyPoint: string;
    sprint: string;
    status: string; 
    created_by:number;
    created_on:Date 
}

export interface Project {
    project_id:number,
    projectName: string;
    projectOwner:number,
    startDate:Date;
    endDate:Date;
    
    
}


export interface CreateIssueResponse {
    id: number;
    message: string;
}
