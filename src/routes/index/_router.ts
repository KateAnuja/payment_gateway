import { Router } from 'express';
import Container from 'typedi';
import { IndexRouter } from './index';
const router = Router();

const indexRouter=Container.get(IndexRouter);

router.get('/',indexRouter.indexRouter);
router.get('/tnc',indexRouter.tncRouter);
router.get('/contact',indexRouter.contactRouter);
router.get('/privacy',indexRouter.privacyRouter);
router.get('/manifest',indexRouter.manifestRouter)


export default router;