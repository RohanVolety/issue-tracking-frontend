
export interface SignupForm {
    name: string;
    email: string;
    password: string;
    profileImage: string;
    role: string;
}

export interface SignupResponse {
    message: string;
    userId: number;
}
