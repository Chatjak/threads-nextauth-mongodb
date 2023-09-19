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

export interface commentType {
    _id: string;
    user: user;
    post_id: string;
    description: string;
    createdAt: string
}