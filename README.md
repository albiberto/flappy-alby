# flappy-alby

## Prerequisite

To run the game, you need to install the .NET6 Core runtime. You can do that by visiting the [.NET 6](https://www.microsoft.com/net/core) and following the install procedure.


## Environments
## Run



to run, the game, locally. Open the console on project folder and run the following command:

```
dotnet run
```

after that, you can play the game by opening the browser and visiting the following url:

```
http://localhost:7126
```

to try the game, just click [here](https://albiberto.ddns.net/game/).


LOCAL: docker-compose up postgres

DEVELOPMENT: docker-compose up
STAGING: docker-compose -f docker-compose.yml -f docker-compose.staging.override.yml --env-file .env-staging up
