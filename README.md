
## Running the app

```bash
# build nestjs app image
$ docker build -t 'nest-app' .

# run app
$ docker-compose up
```


## Running quiries 

### Go to the http://localhost:3000/graphql

### Roles

```bash
# mutation for role creation
mutation createRole($name: String!, $machine_name: String!){
  createRole(name: $name, machine_name: $machine_name){
    name,
    machine_name,
  }
}

# query to get roles
query{
  roles{
    name
    machine_name
  }
}

```


### Users

```bash
# mutation for user creation
mutation createUser($username: String!, $email: String!, $role_machine_name: String!, $firstName: String, $lastName: String, $state: String){
  createUser(username: $username, email: $email, role_machine_name: $role_machine_name, firstName: $firstName, lastName: $lastName, state: $state){
    username,
    email,
    createdAt,
    profile{
      firstName,
      lastName,
      state,
    }
    role{
      name
    }
  }
}

# query to get users
query{
  # also you can filter users by role name 
  users(role_name: "Admin"){
    id, 
    username
    email
    profile{
      firstName
      lastName
      state
    }
    role{
      name
    }
  }
}

# mutation to update user
mutation updateUser($username: String!, $firstName: String, $lastName: String, $state: String, $role_machine_name: String){
  updateUser(username: $username, firstName: $firstName, lastName: $lastName, state: $state, role_machine_name: $role_machine_name){
    id,
    username,
    email,
    createdAt,
    profile{
      firstName,
      lastName,
      state,
    }
    role{
      name
    }
  }
}

# mutation to delete user
mutation deleteUser($username: String!){
  deleteUser(username: $username)
}

```