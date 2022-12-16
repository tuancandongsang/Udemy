# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```
### Create Dockerfile
```
FROM strapi/base:14
ENV NODE_ENV production

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install && npm cache clean --force
COPY . ./

RUN npm run build

EXPOSE 1337

CMD ["npm","start"]
```
### Create docker-composer.yaml
```
version: '3'
services:
  mysql:
    container_name: MDO-Database
    platform: linux/x86_64
    image: mysql:5.7
    command: mysqld --default-authentication-plugin=mysql_native_password
    restart: always
    expose:
      - "3306"
    ports:
      - "3307:3306"
    volumes:
      - ./data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: MDO-DB-Password
      MYSQL_DATABASE: mdo-database
      MYSQL_USER: MDO-DB-Admin
      MYSQL_PASSWORD: MDO-DB-Password
  strapi:
    build: .
    container_name: MDO-Api
    environment:
      DATABASE_CLIENT: mysql
      DATABASE_HOST: mysql
      DATABASE_PORT: 3306
      DATABASE_NAME: mdo-database
      DATABASE_USERNAME: MDO-DB-Admin
      DATABASE_PASSWORD: MDO-DB-Password
      DATABASE_SSL: 'false'
      APP_KEYS: V3a8bqYkjr1IOG6pkjwuBA==,Pv5xg/4cUFjL3X1YAMo3Hg==,GrwU7AelWGPmfY1cwl7znQ==,0qTeOMaudnBr/h/NFJWdSg==
      JWT_SECRET: 0858f0f9-9e7f-4299-a4dd-3a087812042a
      API_TOKEN_SALT: 66bd9ad81641e2131b6f241716739f36
      CLOUDINARY_NAME: bsd-assets
      CLOUDINARY_KEY: 412128275792396
      CLOUDINARY_SECRET: fobh4dGwCpAxvaZuOq9D-0MYao0
    ports:
      - '1337:1337'
    depends_on:
      - mysql
```

### Build docker image
- ```docker-compose build --no-cache```
### Start docker container
<!-- - ```docker-compose up --force-recreate --detach``` -->
- ```docker-compose up --detach```

### Config apache proxy
- enable mods:
  ```
  sudo a2enmod proxy
  sudo a2enmod proxy_http
  sudo a2enmod headers
  ```
- Create config
    
    ```
        cd /etc/apache2/sites-available
        touch api.mdo.com.vn.conf
        nano api.mdo.com.vn.conf
    ```
- Add content *api.mdo.com.vn.conf*
    
    ```
    <VirtualHost *:80>
        ServerName api.mdo.com.vn
        ProxyPreserveHost On
        <Proxy *>
                Require all granted
        </Proxy>
        <Location />
            ProxyPass http://127.0.0.1:1337/
            ProxyPassReverse http://admin.mdo.com.vn/
            Order allow,deny
            Allow from all
        </Location>
        <Location /admin>
            ProxyPass http://127.0.0.1:1337/admin
            ProxyPassReverse http://admin.mdo.com.vn/admin
            Order allow,deny
            Allow from all
        </Location>
        <Location /api>
            ProxyPass http://127.0.0.1:1337/api
            ProxyPassReverse http://admin.mdo.com.vn/api
            Order allow,deny
            Allow from all
        </Location>
        Header set Access-Control-Allow-Origin "https://mdo.com.vn"
        RequestHeader set Access-Control-Allow-Origin "https://mdo.com.vn"
        RequestHeader set Origin "https://mdo.com.vn"
    </VirtualHost>
    ```

- Restart apache
    ```
    systemctl restart apache2
    ```
