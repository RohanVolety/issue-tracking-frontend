export interface Issue {
    issue_id: number;                
    assignee: number;          
    createdOn: Date;
    description: string;       
    lastUpdated: Date;         
    priority: string;
    project: number;
    status: string;            
    summary: string;
    createdBy: number;         
    sprint: string;            
    storyPoint: number;        
    tags: string;              
    type: string;              
  }

  export interface FilterIssue {
    issue_id: number;                
    assignee: number;          
    createdOn: Date;           
    description: string;       
    lastUpdated: Date;         
    priority: string;          
    project: number;          
    status: string;           
    summary: string;           
    createdBy: number;         
    sprint: string;            
    storyPoint: number;        
    tags: string;              
    type: string;   
    assigneeImage:string;
    assigneeName:string;
    createdDate:Date;

  }

  