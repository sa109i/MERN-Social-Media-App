import { Router } from "express";
import {
    getFeedPosts, 
    getUserPosts,
    likePost
} from "../controllers/post.js"
import { verifyToken } from "../middleware/auth.js"

const router = Router()

router.use(verifyToken)

router.get('/', getFeedPosts)
router.get('/:id', getUserPosts)

router.patch('/:id', likePost)

export default router