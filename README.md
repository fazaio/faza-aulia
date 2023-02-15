# faza-aulia
Backend (mongoDB, mongoose + redis + express)

## Preparation

Clone this repo :
``` 
git clone https://github.com/fazaio/faza-aulia.git 
```
Create ```.env``` file in root directory, example:
```
MONGO_URI='<your mongoo db>' //(required)
```



Npm install & start server:
```
npm i && npm run start
```


## REST-API
### (GET) Generate token
Token based on ```jsonwebtoken``` [(doc)](https://www.npmjs.com/package/jsonwebtoken)
```
http://localhost:3000/users/generateToken
```

### (GET) Read all users
Payload ```id``` is accountNumber value!
```
http://localhost:3000/users/all
```

### (GET) Find user by ```accountNumber```
Params ```id``` is accountNumber value!
```
http://localhost:3000/users/accountNumber/:id
```

### (GET) Find user by ```identityNumber```
Params ```id``` is identityNumber value!
```
http://localhost:3000/users/identityNumber/:id
```

### (POST) Create new user
Endpoint :
```
http://localhost:3000/users/create
```
Payload:
```
{
    "userName": "human",
    "accountNumber": "123123",
    "emailAddress": "human@gmail.com",
    "identityNumber": "412314123",
}
```

### (POST) Upate user by ```id```
Endpoint :
```
http://localhost:3000/users/update/:id
```
Payload:
```
{
    "userName": "robot",
    "accountNumber": "984187519283",
    "emailAddress": "robot@gmail.com",
    "identityNumber": "984a3n5i351",
}
```

### (DELETE) DELETE user by ```id```
```
https://localhost:3000/users/delete/:id
```

## Note
Project Folder Structure:

![Screenshot from 2023-02-11 23-23-16](https://user-images.githubusercontent.com/42485508/218269175-8cb5b1a9-2ed3-4ab6-b0e7-899d0bc400f6.png)

This project use mongoose to create DB model.

If you Redis Connection not default, you can setting Redis connection in ```src/configs/redis.js``` 

Deploy Hosting https://fazaaulia-faza6028.b4a.run/

Docker registry:
```
docker pull fazaio/faza-aulia
```
Hosting by [back4app](back4app)

