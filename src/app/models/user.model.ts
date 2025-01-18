export interface User {
    user_id: number;              // User ID
    email: string;             // User email
    name: string;              // User name
    password: string;          // User password (hashed)
    profile: string;           // Profile image URL or description
    role: string;              // User role (e.g., Admin, Assignee)
  }
  
  