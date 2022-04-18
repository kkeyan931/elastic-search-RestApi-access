# elastic-search-RestApi-access

## Install the dependencies

```
npm i
```

## Run the server

```
npm run start
```

## Hit the API endpoint

<img width="523" alt="image" src="https://user-images.githubusercontent.com/65884897/163767083-c35f0e66-540b-4c65-a1df-6763d5d87d67.png">

<img width="300" alt="image" src="https://user-images.githubusercontent.com/65884897/163767139-c48e28bb-8778-438a-ada4-7f406b02e6da.png">

```
limit - represents the maximum number of documents returned for the request.
offset - represents which document will start the page.
order_date - orders placed on the particular date
```

## Request limit
By default 2 requests was given as the maximum request a user can send in a hour. This can be configured in the middlewares/rateLimiter.js by changing max to N.

If request is exceeded for a particular user. the response will be

<img width="523" alt="image" src="https://user-images.githubusercontent.com/65884897/163767934-d59a2374-c130-4119-8aad-9a30fb52c5e9.png">

for rate limiting used the **express-rate-limit** https://github.com/nfriedly/express-rate-limit
which will identify the user based on the IP address. which can be configured to use different method.
