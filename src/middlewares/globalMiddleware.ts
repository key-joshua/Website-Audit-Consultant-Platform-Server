import { URL } from 'url';
import NodeCache from "node-cache";
import rateLimit from 'express-rate-limit';
import StatusCodes from 'http-status-codes';
import responseUtils from '../utils/responseUtils';
import { extractDomain } from '../utils/globalUtils';
import auditRepository from '../modules/audits/repository/auditRepository';

const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_TTL) || 300 });

const isURLExist = async (req, res, next) => {
    try {
        const domain = new URL(req.body.url).hostname;
        let websiteExist = await auditRepository.findAuditVersions(domain);
        if (!websiteExist) websiteExist = await auditRepository.createWebsite({ url: req.body.url, domain: domain });
  
        req.body = websiteExist;
        return next();
    } catch (error: any) {
        responseUtils.handleError(error?.status || StatusCodes.INTERNAL_SERVER_ERROR, error.toString());
        return responseUtils.response(res);
    }
};

const rateLimiter = rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
	windowMs: 60 * 1000,
	limit: Number(process.env.REQUEST_LIMIT),
    handler: (req, res) => {
        return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            status: StatusCodes.TOO_MANY_REQUESTS,
            message: `Too many requests. Maximum allowed, ${process.env.REQUEST_LIMIT} requests per minute.`
        });
    }
});

const cacheMiddleware = (req, res, next) => {
    const method = req.method;
    if (method !== 'GET' && method !== 'POST') return next();

    const domain = extractDomain(req);
    const cacheKey = `audit:${domain}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
        console.log(`CACHE FOUND: ${domain}`);
        res.send(cachedResponse);
        return;
    }

    console.log(`CACHE NOT FOUND: ${domain}`);
    const originalSend = res.send;
    res.send = function (body: any) {
        if (res.statusCode >= 200 && res.statusCode < 300) cache.set(cacheKey, typeof body === 'string' ? JSON.parse(body) : body);
        return originalSend.call(this, body);
    };

    next();
};

export {
    isURLExist,
    rateLimiter,
    cacheMiddleware
};
