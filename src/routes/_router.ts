import { Router } from 'express';
import indexRouter from './index/_router';

const router = Router();
router.use('/',indexRouter);


export default router;