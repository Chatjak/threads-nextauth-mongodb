export interface user {
    name: string;
    email: string;
    image: string;
}

export interface post {
    user: user
    description: string
    image?: Blob
}