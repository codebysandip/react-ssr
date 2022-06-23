
export {};
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            IS_SERVER: string;
            IS_LOCAL: string;
        }
    }
}