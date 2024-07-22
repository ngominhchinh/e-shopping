# Install dependencies
```$ npm install```
# Running server
```$ node app.js```
- The server listens at port 3000
# APIs
#### Student model
    {
        id: 1,
        name: 'Vũ Đình Sơn',
        description: 'Xây thành phố, làm bài thi không đạt',
        action: 'Xem xét'
    }, 
#### Getting all students
```GET http://localhost:3000/students```
#### Getting a student by id
```GET http://localhost:3000/students/1```
#### Creating a student
```POST http://localhost:3000/students```
#### Deleting a student by id
```DELETE http://localhost:3000/students/1```
#### Updating a student by id
```PUT http://localhost:3000/students/1```
