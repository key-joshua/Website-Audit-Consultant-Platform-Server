
import { Router } from 'express';
import audit from './auditRoute';

const router: Router = Router();

router.use('/audit-website', audit);

export default router;
