
# Estante Virtual (Collaborative Library)

- **Developed by:** [Julio L. Muller](https://github.com/juliolmuller)
- **Released on:** Aug 22, 2019
- **Updated on:** Jul 21, 2020
- **Latest version:** 0.1.2
- **License:** MIT

## Overview

This is an application developed as a challenge, proposed by the company [HeroSpark](https://herospark.com/). The application seeks to maintain records of users and books they register and which can be borrowed among the community. It uses a fake back-end to persist the data and allow API consumption with RESTful patterns.

![Collaborative Library](./app-overview.jpg)

## How to Set Up the Environment

This application is compatible to non-production environments, since the fake back-end does not provide full services and security for the user data. However, to set it up in your local machine, observe the following steps:

### Software Required

Make sure you have [Node.js](https://nodejs.org/) installed and have its package manager (`npm`) added to the enviroment variables.

### Dependencies Installation

After downloading or cloning this repository, run the following command line inside your root project directory:

```bash
npm install
```

### Run the Server

The web server used by the application is **JSON Server**, a Node based app which raises a server and provides a simple REST API, so we can easily perform `GET`, `POST`, `PUT` & `DELETE` HTTP requests with data being persisted in a JSON file. To initialize the server, run:

```bash
cd server && npm start
```

## Build Vue.js Application

To start up your application and build the development files, run the following code:

```bash
npm run serve
```

**DONE!!!** Check out the console output to see which port of your *localhost* the application is listening to.

## Technologies

Here are the main technologies used to build this project:

### Back-End

- **Programing Language:** JavaScript
- **Front-End Framework:** [Vue.js 2](https://vuejs.org/) (with [Vuex](https://vuex.vuejs.org/))
- **HTTP Client:** [axios](https://github.com/axios/axios)
- **Web Server:** [JSON Server](https://github.com/typicode/json-server)
- **Styles Framework:** [Bootstrap 4](https://getbootstrap.com/)

### Dev Tools

- **Text Editor:** [Visual Studio Code](https://code.visualstudio.com/)
- **Console Emulator:** [Cmder](https://cmder.net/)
- **JS Package Manager:** [Node.js](https://nodejs.org/en/)
- **API Development Environment:** [Postman](https://www.getpostman.com/)
- **Versioning Tool:** [Git](https://git-scm.com/)
- **Remote Repository:** [GitLab](https://gitlab.com/) & [GitHub](https://github.com/)
