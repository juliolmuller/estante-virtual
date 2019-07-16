In order to do this activity you have to fork the repository available in [https://gitlab.com/jeanmalves/colaborative-library](https://gitlab.com/jeanmalves/colaborative-library). 

Endpoint API:

First, you should execute the npm install in `/server`, after, you should init the server in `/server` and execute the command `npm run serve`.

Loan Object:

`"loan": {"userId": 3,"date": "03/06/2018"}`

Book Object: 

`“book”: {"id": 4,"name": "O Hobbit","userId": 1,"loan": loan}`

`“loan”: false, default value.`

POST    /books          params:  book,    return: 200 ok

GET     /books                                             return:  [ book ]

GET     /books/:id                                      return:  book

PUT     /books/:id     params:  book

DELETE  /books/:id                                 return: 200 ok

User Object: 

  “user”: { 

     "id": 1,

"name": "Teste",

"email": "[teste@teste.com](mailto:teste@teste.com)",

"password": "123456" 

  }

  

POST    /users          params:  user, return: 200 ok

GET     /users/:id                          return:  book

PUT     /users/:id     params:  user

DELETE  /users/:id                                 return: 200 ok

  
  

You can use url parameter like:

* limit: limit data, like: _limit=30
* 
* sort: to data order, like: _sort=id
* 
* order: asc or desc data


*  page: page number, like: _page=2, default value per page: 10.

In url parameter you can use also relationship like: _sort=loan.userId. In order to filter some data you can use . to access deep properties, like: loan.userId=20.

More details visit the link: [https://github.com/typicode/json-server](https://github.com/typicode/json-server)