module.exports = {
  apps: [
    {
      name: 'bsc',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --port 3016',
      cwd: '/www/wwwroot/bsc',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation',
        PORT: '3016',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
