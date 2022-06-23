import express, { Request, Response } from "express";
import { join } from "path";

import { matchPath } from "react-router";
import { Routes } from "src/routes";
import { getHtml } from "src/template";
import { createContextServer } from "./core/functions/create-context";
import { PageData } from "./core/models/page-data";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reload = require("reload");

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`App listening on port: ${PORT}`);
    })
}

const reloadServer = () => {
    reload(app).then(() => startServer()).catch((err: Error) => {
        console.log(`Error on reload of app!!`, err.stack);
    }).catch((err: Error) => {
        console.log("reload app error!!!", err);
    })
}
const isLocal = process.env.IS_LOCAL;
console.log("isLocal!!", isLocal);
if (isLocal) {
    reloadServer();
} else {
    startServer();
}


app.use(express.static(join(process.cwd(), "build/public")));

app.get("*", async (req: Request, resp: Response) => {
    const route = Routes.find(r => matchPath(r.path, req.path));
    if (!route) {
        resp.redirect("/404");
        return;
    }
    route.component().then(async dComp => {
        const Component = dComp.default;
        let props: PageData = { seo: { title: "" }};
        if (Component.getInitialProps) {
            const ctx = createContextServer(req, resp);
            props = await Component.getInitialProps(ctx);
            if (resp.headersSent) {
                return;
            }
        }
        const html = getHtml(Component, props, req.url);
        resp.send(html);
    });
})
