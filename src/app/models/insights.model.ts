export interface Insight {
    TO_DO: number;
    IN_PROGRESS: number;
    DONE: number;
    TESTING: number;
  }
  
  export interface TeamMember {
    user_id: number;
    name: string;
    email: string;
    role: string;
    profile:string,
    // password:string
  }
  
  export interface ProjectOwner {
    user_id: number;
    name: string;
    email: string;
    role: string;
    profile:string;
    // password:string;
  }
  