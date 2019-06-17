# Perfilometer - Server

[![licence MIT](https://img.shields.io/badge/licence-MIT-yellow.svg)](./LICENSE)
[![version 0.1.0](https://img.shields.io/badge/version-0.1.0-green.svg)](https://perfilometer-node.herokuapp.com/)
[![platform NodeJS](https://img.shields.io/badge/platform-NodeJS-blue.svg)](https://nodejs.org/en/)  

Perfilometer Server is a NodeJS server to insert and get roads with perfilometer metrics.

The main server is available on [Heroku Apps](https://perfilometer-node.herokuapp.com/)

## 1. Dependencies

### Required

- [MongoDB](https://www.mongodb.com/)
- [Node ~v6.10.2](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [NPM](https://npmjs.com/)

### Optional

- [Robomongo](https://robomongo.org/)
- [PostMan](https://www.getpostman.com)


## 2. Managing Dependencies

**For all instructions, use one of options. (NPM or Yarn)**

To install all node dependencies, execute the command:

```shell
$ yarn install
```  
```shell
$ npm install
```

To install all production node dependencies, execute the command:

```
$ yarn install --prod
```  
```shell
$ npm install --prod
```

## 3. Environment Configurations

The environment configurations are managed by the file server/config.json.

The file is not tracked by the git because contains sensitive informations. There is a template named server/config.json.template that can be used as reference. Remember that is highly recommend that the JWT_SECRET is randomly used and diferent in each environment.

You can generate the secret the way you want or simple execute the script that uses the package crypto-extra to generate a random string of length 64:

```
$ yarn generate:secret
```  
```shell
$ npm run generate:secret
```

## 4. Running Server

To run the server, execute the command:

```
$ yarn start
```  
```shell
$ npm run start
```

In development is recommend to use the command below that restart the server automatically when changes in the source code happens:

```
$ yarn autostart
```  
```shell
$ npm run autostart
```

After the server start, access the url [http://localhost:3000/]()
