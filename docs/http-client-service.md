# HttpClient Service
HttpClient service is a wrapper for making Http calls. HttpClient internally uses `rxjs/ajax` library to make Http calls.<br />
`rxjs/ajax` internally uses `XmlHttpRequest`.
  - [Why rxjs](#why-rxjs)
  - [HttpClient features](#httpclient-features)

## Why rxjs
`rxjs` is a library for reactive programming. It works for stream of data but making http client don't need of stream expect showing download progress.
But still why we we are using rxjs and answer is inbuilt operators of rxjs. You can pipe multiple inbuilt rxjs operators
to save lot of development time. Here are some of widely used rxjs operators:
  - [Subject](https://www.learnrxjs.io/learn-rxjs/subjects/subject) used to create your own observable
  - [BehaviouSubject](https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject) same like Subject but it saves last value. So whenever subscribe it immediately     emits last value.
  - [map](https://www.learnrxjs.io/learn-rxjs/operators/transformation/map)
  - [mergeMap](https://www.learnrxjs.io/learn-rxjs/operators/transformation/mergemap) euivalent to promise chaining
  - [of](https://www.learnrxjs.io/learn-rxjs/operators/creation/of) equivalent to Promise.resolve
  - [forkJoin](https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin) equivalent to Promise.all
  - [fromEvent](https://www.learnrxjs.io/learn-rxjs/operators/creation/fromevent) can use for listening DOM events
  - [tap](https://www.learnrxjs.io/learn-rxjs/operators/utility/do) mostly used for logging
  - [catchError](https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch) for catching error
  - [retry](https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retry) used for retry for given number of times in case of error.
  - [debounceTime](https://www.learnrxjs.io/learn-rxjs/operators/filtering/debouncetime) used for wait for specified time. Mostly used in case of search input.
  - [distinctuntilkeychanged](https://www.learnrxjs.io/learn-rxjs/operators/filtering/distinctuntilkeychanged) filter values until value not changed

Learning rxjs operators saves lot of development time. You can relate rxjs Observable with Promise terms of syntax.
To get data from Promise you use `Promise.then(data => {})`.
In case of Observable you use `Observable.subscribe(data => {})`. Promise can return only 1 value. But obervables can send data until it's not completed
or unsubscribed. In case of HttpClient it will return only 1 time. You also don't need to manually unsubscribe HttpClient.
You can check the power of rxjs in [HttpClient](https://github.com/sandip12081992/react-ssr/blob/main/src/core/services/http-client.ts).

## HttpClient features
HttpClient code is well documented So here we will discuss only about architectural concept in points:
  - HttpClient always return success data in form of ApiResponse interface. It means your service/component layer don't need to catch the error.
    service/component always get data in subscribe
  - HttpClient will convert api response into ApiResponse. If server api response will send status in response body as key **status** then
    HttpClient will use response body's status otherwise response status will use for ApiResponse.status.<br />
    `Note: If api response is sending status in another key then change key in HttpClient.getApiResponseObject`
  - HttpClient will put response body in ApiResponse.data. If data as key will available in api response body then
    HttpClient will put response body data key for ApiResponse.data
  - For error response, HttpClient will take necessary actions like showing toast message of success/error, adding Authorization header,
    redirecting to login page in case of 403, regenerate token from refresh token when api will send 401 and send original request with new
    generated token.
  - Retry request 3 times after every 500ms if api will send 5xx error.
  - Detect if internet is not available then retry request for 3 times.
  - For error response, ApiResponse.data will be null but if your service/component need response body then paas HttpClientOptions.sendResponseWhenError to true.
  - If your api call will be in `getInitialProps` and it's for auth request then always send HttpClientOptions.nodeReqObj and HttpClientOptions.nodeRespObj.
    In case of auth request on SSR token will fetch from node request's header cookie. If nodeReqObj will not available then
    [CookieService](https://github.com/sandip12081992/react-ssr/blob/main/src/core/services/cookie.service.ts) will throw exception. In case when api will throw 401
    then HttpClient will try to regenerate token from refresh token. After recieveing new token HttpClient will set new token in cookie.
    Here on SSR nodeRespObj needed to set cookie in node response header. If nodeRespObj will not available then CookieService with throw exception.

