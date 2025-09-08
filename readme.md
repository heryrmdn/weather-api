# Weather API

Simple Weather API.

## Description

Simple weather API that fetches and returns weather data with implemented redis for caching data.

## Getting Started

### Dependencies

Prerequisites needed before installing program.

* node: 22.19.0
* npm: 10.9.3
* Typescript: 5.9.2
* Docker & Docker Compose (if running via container)


### Installing
Clone the repository & install dependencies:
```
npm i
```


### Configuration
1. Rename .env.example to .env
2. Fill in the required environment variables

## Running the Application with Docker

### Step 1: Build Docker images

```
docker compose build
```

### Start the containers

```
docker compose up -d
```

#### This will:

* Build the Weather API Docker image
* Start the API container
* Start the Redis container

Access the API at: http://localhost:3001

## Authors

Hery Rhamadan  
[Connect me on Linkedin](https://www.linkedin.com/in/hery-rhamadan/)

## Version History

* 1.0.0
    * Initial Release

## Acknowledgments

Inspiration, code snippets, etc.
* [roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service)