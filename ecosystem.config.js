module.exports = {
  apps: [
    {
      /**
       * Change the name to project name
       */
      name: "React-SSR",
      script: "./build/server.js",
      instances: "max",
      env_production: {
        NODE_ENV: "production",
        ENV: "production",
      },
      max_restarts: 5,
      restart_delay: 1000,
    },
  ],
};
