import { postTask, patchTask, getTask, getColumeTask, deleteTask } from "../controllers/tasks.js";
import express from "express";

const router = express.Router()

router.post('/', postTask);

router.patch('/:id', patchTask);

router.get('/:id', getTask);

router.get('/colume/id', getColumeTask);

router.delete('/:id', deleteTask);

export default router