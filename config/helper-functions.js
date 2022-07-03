const isServerFn = (env) => {
    return JSON.parse(env.IS_SERVER || "false")
}

const isLocalFn = (env) => {
    return JSON.parse(env.IS_LOCAL || "false")
}

/**
 * Get Absolute path by providing relative path
 * @param {String} relativePath relative path of file
 * @returns Absolute path of file
 */
 function getPath(relativePath) {
    return `${process.cwd()}/${relativePath}`;
}
module.exports = {
    isServerFn,
    isLocalFn,
    getPath
};