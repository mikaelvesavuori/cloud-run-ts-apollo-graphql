# Apollo Server (GraphQL) API using Typescript, deployed on Google Cloud Run

This package builds on a mildly modified version of the vanilla example from [Apollo Server version 2](https://www.apollographql.com/docs/apollo-server/getting-started/). Read more about that here.

The example code allows you to do a single query to get users. See code below.

```
const typeDefs = gql`
  type Query {
    getUsers: [User]
  }

  type User {
    name: String
    userId: String
    email: String
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => await getUsersUseCase()
  }
};
```

Features of this repo are:

- Basic "clean architecture" structure
- Unit and "integration" testing with Jest
- Cloud Run as deployment platform, with pre-baked Cloud Build script
- Uses `ts-node` to run Typescript code without bundling/compiling

**Note**: Look through scripts and the `cloudbuild.yaml` file to ensure they look they way you need, including image/repo/service names etc.

## Running locally

### Compile and run

Install dependencies, then run `npm start` to use `ts-node` to run your code.

### Build Docker image and run it

Build with (for example):

```
docker build -t $IMAGE:latest .
```

Then run it with:

```
docker run -it -d -p 8080:8080 $IMAGE:latest
```

For detached mode, add the `-d` flag like so, `docker run -d -it -p [...]`. Execute things inside the container with `docker exec -ti $CONTAINER_ID [command]`.

To stop the container (for example when you want to rebuild a new version and try it), make sure to list containers and stop and remove them:

```
docker ps
docker stop [ID]
docker rm [ID]
```

## Deploying

The below assumes Bash/zsh in Mac, but should be possible to run in Linux and Windows with minor syntax changes.

1. Ensure you are logged in, with `gcloud auth login`
2. Ensure you have a project ready to use, else create a new one
3. Manually set Cloud Build settings according to the below image

![Cloud Build settings](docs/cloud-build-service-account-permissions.png 'Cloud Build settings')

4. Manually set Cloud IAM settings according to the below image

![Cloud IAM roles](docs/iam-roles.png 'Cloud IAM roles')

5. Set your values in `vars.sh`, including project name
6. Export variables in `vars.sh` with `sh vars.sh`
7. Create infrastructure and deploy code with `sh setup.sh`

## Improvements that could be done

- This still uses the classic Google Container Registry, not Artifact Registry (ran into permissions issues?)
- IIRC, I did not get [`apollo-server-fastify`](https://www.npmjs.com/package/apollo-server-fastify) to work, which I'd prefer over the [Express version used here](https://www.npmjs.com/package/apollo-server-express)
