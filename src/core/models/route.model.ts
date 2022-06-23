
export interface IRoute {
    path: string;
    component: () => Promise<{default: any }>;
}