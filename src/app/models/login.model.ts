export interface LoginForm {
    email: string;
    password: string;
    role: string;
}

export interface LoginResponse {
    user_id: number;
    email: string;
    password: string;
    role: string;
}

export interface UserDetails {
    name: string;
    profile: string;
}
