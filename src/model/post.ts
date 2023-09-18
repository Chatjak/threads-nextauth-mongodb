import { user } from "@/types/model";
import mongoose, { Document, InferSchemaType } from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema({
    user:
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, "title cannot be grater than 200 characters"],
    }
}, { timestamps: true })

export type Post = Document & InferSchemaType<typeof postSchema>
const PostModal = mongoose.model('Post', postSchema)

export const createPost = async (User: user, description: string) => {
    const post = new PostModal({
        user: { email: User.email, name: User.name, image: User.image },
        description: description
    })
    await post.save()
    return post
}

export const deletePost = async (post_id: string) => {
    const post = await PostModal.findByIdAndDelete(post_id)
    return
}

export const getPostById = async (post_id: string) => {
    const post = await PostModal.findById(post_id)
    if (!post) {
        throw new Error()
    }
    return post
}

export const editPostById = async (post_id: string, description: string) => {
    const post = await PostModal.findOneAndDelete({ _id: post_id }, { description: description })
    if (!post) {
        throw new Error()
    }
    return post
}

export const getAllPost = async () => {
    const posts = await PostModal.find({}).sort({ createdAt: -1 })
    return posts
}
export default PostModal