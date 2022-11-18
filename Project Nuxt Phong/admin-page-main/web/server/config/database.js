const path = require('path');

module.exports = ({env}) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db'))
    },
    useNullAsDefault: true
    // client: 'postgres',
    // connection: {
    //   host: env('DATABASE_HOST', 'ec2-54-208-96-16.compute-1.amazonaws.com'),
    //   port: env.int('DATABASE_PORT', 5432),
    //   database: env('DATABASE_NAME', 'd1fks68do0r1r'),
    //   user: env('DATABASE_USERNAME', 'lqyiespssyghls'),
    //   password: env('DATABASE_PASSWORD', '9e845657d70289504b3f8a737c6d9d5c3523da2caf26778d8c2aca882b0e8a29'),
    //   schema: env('DATABASE_SCHEMA', 'public'), // Not required
    //   ssl: {
    //     rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false) // For self-signed certificates
    //   }
    // },
    // debug: false
  //   client: 'mysql',
  //   connection: {
  //     host: env('DATABASE_HOST', '127.0.0.1'),
  //     port: env.int('DATABASE_PORT', 3306),
  //     database: env('DATABASE_NAME', 'strapi'),
  //     user: env('DATABASE_USERNAME', 'strapi'),
  //     password: env('DATABASE_PASSWORD', 'strapi'),
  //     ssl: {
  //       rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false) // For self-signed certificates
  //     }
  //   },
  //   debug: false
  // }
});

