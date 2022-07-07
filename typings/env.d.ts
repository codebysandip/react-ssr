
export {};
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            IS_SERVER: string;
            IS_LOCAL: string;
            ENV: string;
            API_BASE_URL?: string;
            LOCAL_API_SERVER: string;
            NODE_ENV?: string;
        }
    }
}