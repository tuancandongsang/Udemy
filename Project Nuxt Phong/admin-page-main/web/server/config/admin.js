module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'someRandomLongString'),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c4caa8ed33702a0fc72b6d467981b2db'),
  },
});
