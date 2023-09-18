export interface user {
    name: string;
    email: string;
    image: string;
}

export interface post {
    _id: string
    user: user
    description: string
    createdAt: string

}