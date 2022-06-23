// import { Request, Response } from "express";

import { Request, Response } from "express";

export interface ContextData {
    location: {
        pathname: string;
        hostname: string;
    },
    query: Record<string, any>;
    params: Record<string, string>;
    /**
     * Request Object of express will available
     * only for server side
     */
    req?: Request;
    /**
     * Response Object of express will available
     * only for server side
     */
    res?: Response;
}