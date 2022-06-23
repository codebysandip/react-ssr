import { Request, Response } from "express";
import { ContextData } from "core/models/context.model";
import { Location } from "react-router";

export function createContextServer(req: Request, resp: Response) {
    if (!JSON.parse(process.env.IS_SERVER)) {
        throw new Error("createContextServer function can execute only on server!!")
    }
    const context: ContextData = {
        location: {
            pathname: req.path,
            hostname: req.hostname
        },
        query: req.query,
        params: req.params,
        req,
        res: resp
    };
    return context;
}

export function createContextClient(location: Location, searchParams: URLSearchParams, params: Record<string, string>) {
    if (JSON.parse(process.env.IS_SERVER)) {
        throw new Error("createContextClient function can execute only on client!!")
    }
    const query: Record<string, string> = {};
    for(const entry of searchParams.entries()) {
        query[entry[0]] = entry[1];
    }
    const context: ContextData = {
        location: {
            pathname: location.pathname,
            hostname: window.location.hostname
        },
        query,
        params
    };
    return context;
}