# Event Driven App

* Imlementing event-driven-microservices

- Learn More [APACHE KAFKA](https://kafka.apache.org/).
- Learn More [KAFKAJS](https://kafka.js.org/).
- Learn More [DOCKER](https://www.docker.com/).

## Technologies
- Docker,React,Kafka
- Nodejs,mongoDB,Typescript

## Quick Start
```bash
# Run in Docker
docker-compose up
# use -d flag to run in background
# Tear down
docker-compose down
# start command for each server
npm start
```
## Base Project Structure

    ├── ...
    ├── app
            ├── src                   
            ├── api                    
            ├── configs                     
            ├── events                    
            ├── loaders                   
            ├── models
            └── services
            ├── validators                    
            ├── sources                     
            ├── utils
            ├── index.ts                   
        ├── .env                   
        ├── .gitignore
        ├── package-lock.json
        ├── package.json
        ├── tsconfig.json
    ├── ...
    
    ├── .dockerignore
    ├── .docker-compose.yml
    └── README.md


![capstone (1)](https://user-images.githubusercontent.com/62605922/190700179-0706a8fb-b747-4d0a-8b6d-b14ceb8e56ed.png)