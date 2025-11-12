import { getColume, getBoardeColume, postColume, patchColume, deleteColume } from "../controllers/column.js";
import express from 'express';

const router = express.Router();

router.get('/:id', getColume);

router.post('/', postColume);

router.patch('/:id', patchColume);

router.delete('/:id', deleteColume);

router.get('/board/:id', getBoardeColume);

export default router;
