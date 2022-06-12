# flappy-alby

It is a reinterpretation of the famous FlappyBird game.

<p align="center">
  <img src="https://github.com/albiberto/flappy-alby/blob/main/assets/game.gif" alt="Level Over"/>
</p>

## Prerequisite

To run the game, you need to install the .NET7 preview runtime. 
You can do that by visiting the [.NET 7](https://www.microsoft.com/net/core) and following the install procedure.

## Environments and Run
The application supports four different ways.
1. DEBUG: to run the application locally you have to have a PostgresSQL instance running on your machine.
To run Postgres with Docker launch the following command ```docker-compose up postgres``` from console on root project folder.
To run the application use Visual Studio or launch the following command ```dotnet run --configuration FlappyAlby.DEBUG``` in the same way as above.
2. DEVELOPMENT: in this mode you run a entire docker-compose file with PostgresSQL, Loki, Prometheus and Grafana. 
The application docker image is building from docker-compose file.
To run the application in DEVELOPMENT ENVIRONMENT launch the following command ```docker-compose up```.
3. STAGING: in this mode you run a entire docker-compose file with PostgresSQL, Loki, Prometheus and Grafana. 
The application docker image is pulled from [Docker Hub](https://hub.docker.com/repository/docker/albiberto/flappy-alby) with ```staging``` tag.
In charge to build the staging docker image and push it on DockerHub with ```staging``` tag is a GitHub actions located [here](https://github.com/albiberto/flappy-alby/blob/main/.github/workflows/docker-image.yml)
To run the application in DEVELOPMENT ENVIRONMENT launch the following command ```docker-compose -f docker-compose.yml -f docker-compose.staging.override.yml --env-file .env-staging up```.
4. PRODUCTION: not available here.

## URLs

1. DEBUG: http://localhost:5000
2. DEVELOPMENT: http://localhost:5000
3. STAGING: http://localhost:5000
4. PROD: [Flappy-Alby](https://albiberto.ddns.net/)
