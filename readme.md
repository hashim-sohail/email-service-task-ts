# Email Service

Email Service is microservice to send out emails

![architecture](https://user-images.githubusercontent.com/22448789/130808220-8561b0b1-a05c-4e52-a791-3b7126847559.png)


## Pre Reqs
- [Node V12](https://nodejs.org/en/)

## Installation

Use the npm to install node_modules

```bash
npm i
```

## Run Server
### Prod
`npm run start`
### Dev
`npm run dev`
### Debug
`npm run debug`

## Test
### Unit Tests
`npm run tests`

### Lint Tests
`npm run lint`

###
## Usage

### POST /email

#### Request
```
{
    "to": [ "user@example.com" ],
    "body": "This is email body"
}
```

#### Response 400
In case of missing parameter `to`
```
{
    "error": "To should be an array of emails"
}
```

In case of missing parameter `body`
```
{
    "error": "Body is missing"
}
```

In case of missing parameter `subject`
```
{
    "error": "Subject is missing"
}
```

### Response 200
```
{
    "sent": true
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
