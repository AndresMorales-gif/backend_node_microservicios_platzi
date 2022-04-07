module.exports = {
  apps: [
    {
      name: 'API-MAIN',
      script: 'api/index.js',
      watch: true,
    },
    {
      name: 'API-MYSQL',
      script: 'mysql/index.js',
      watch: true,
    },
    {
      name: 'API-POST',
      script: 'post/index.js',
      watch: true,
    }
  ],
};