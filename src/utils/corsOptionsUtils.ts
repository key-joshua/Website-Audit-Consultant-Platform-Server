
import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true,
    methods: 'POST, GET,  PUT, PATCH, DELETE, HEAD',
    allowedHeaders: ['Content-Type', 'Authorization', 'User-Device'],
};
