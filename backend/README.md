# :construction_worker: Search Engine API
 Base template API to quick start api projects

<br>

## :sparkles: Features
* 

<br>

## :wrench: Installation
You need [Git](https://git-scm.com/), [Node.js](https://nodejs.org/), [Yarn](https://yarnpkg.com/), [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) in order to run the project.

First of all, clone the repository:
```bash
git clone ...
```
Then enter the folder and install dependencies
```bash
cd template-node-api
yarn install
```
Create your .env file and put there your configs
```bash
cp .env.example .env
```

Pull and build the docker images
```bash
docker-compose up
```

<br>

## :book: Docs

The API provides Swagger docs at http://localhost:3003/api-docs/#/ in case you already have the project running in your computer. In case you do not want to run the project, just got to [docs](https://kortkamp.github.io/swagger-viewer/?host=https%3A%2F%2Fraw.githubusercontent.com%2Fkortkamp%2Ftemplate-node-api%2Fmain%2Fsrc%2Fdocs%2Fswagger.json).

Do not edit swagger.json file directly, instead edit the files inside ./src/docs to update you project documentations, then if you need a unique file for static serving purposes generate a new one by running the command below.


```bash
yarn docs:build
```

<br>

## 	:microscope: Tests
This project is covered by tests. If you make any changes to the code, run the command below to ensure your change didn't break anything:

```bash
yarn test
```

<br>

Made with love by [Kortkamp](https://github.com/kortkamp)
