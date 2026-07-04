import { Router } from 'express';
import { isURLExist } from '../middlewares/globalMiddleware';
import auditController from '../modules/audits/controller/auditController';
import { domainSchema, urlSchema, uuidSchema } from '../validations/validations';
import { routeBodyValidation, routeParamsValidation } from '../middlewares/requestMiddleware';


const router: Router = Router();

router.post('/', routeBodyValidation(urlSchema), isURLExist, auditController.auditWebsite);
router.get('/id/:id', routeParamsValidation(uuidSchema), auditController.getWebsiteAuditVersion);
router.get('/domain/:domain', routeParamsValidation(domainSchema), auditController.getWebsiteAuditVersions);

export default router;
