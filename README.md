[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Introduction

A message blockchain to help me understand how it works. It's still a work in progress...

## Roadmap

Here I will outline a few key features I am planning to add.

- User authentication
- API authentication
- A front end ui

## Installation

You need a [MongoDB](https://www.mongodb.com/) account and fill out the ```.env``` to connect to your database.

### Docker

Get the image here: https://hub.docker.com/repository/docker/mikeylau/message-block-chain

### Local

```
node .
```

or

```
docker-compose up
```

## Usage

**GET** ```/v1/users```

| Body parameters | Description |
| --- | --- |
| firstName **(required)** | New user's first name |
| lastName **(required)** | New uses's last name |
| email **(required)** | New user's email |
| password **(required)** | New user's password |

## Author

Mikey Lau

[Portfolio](https://mikeylau.uk)
