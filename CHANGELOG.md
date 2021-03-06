# Change Log

This project adheres to [Semantic Versioning Scheme](http://semver.org)

## [v0.12.4] 2017-11-24

### Fixed

- `fromXHR` in `ErrorResponse` now tries to `JSON.parse` the `responseText` from the `xhr` request to make errors easier to read


## [v0.12.3] 2017-11-22

### Fixed

- Call appropriate `onError` listener if `fetchToken` fails as part of a subscription


## [v0.12.2] 2017-11-22

### Changes

- Removed custom `XMLHttpRequest` and `WebSocket` and `Window` declarations and added `"webworker"` to `"lib"` in `tsconfig.json`


## [v0.12.1] 2017-11-21

### Changes

- Added `sendRawRequest` to allow service-specific SDKs to make requests without having to worry about networking setups themselves. `sendRawRequest` takes an `options` parameter of type `RawRequestOptions`


## [v0.12.0] 2017-11-17

### Changes

- `request` no longer takes `tokenProvider` as a second parameter, it is now a part of the `options` parameter, of type `RequestOptions`
- `TokenProvider`'s `fetchToken` now returns a normal a Promise instead of a PCancelable
- `request` in `Instance` and `BaseClient` now return a normal `Promise` instead of a `PCancelable`
- React Native support (use `pusher-platform/react-native`)
- Code formatted using prettier
- Code linted using tslint
- strict mode enabled in `tsconfig.json`
- Refactored TokenProvidingSubscription
- Removed jwt-simple as dependency
- Removed p-cancelable as dependency
- Build artifacts now live in dist/ instead of target/
- Single index.d.ts declarations file no longer generated (removed dts-bundle as a dependency)


## [v0.11.1] 2017-11-03

### Fixes

- Treat all 2XX status codes as successful

## [v0.11.0] 2017-11-03

### Changes

This is quite big change since we added `websockets`
as basic transport for all subscriptions. On the other
hand there are no changes on public interfaces (library is using different transport internally).

- Added `websockets` as basic transport for all subscriptions
- Separate `HTTP` related code into HTTP transport object

## [v0.10.0] 2017-10-27

### Changes

- `instanceId` renamed to `locator` in Instance class
- Added export of `SubscriptionEvent`

### Fixes

- Default `logger` now set in `BaseClient` if `baseClient` without a `logger` is provided to the `Instance` constructor

## [v0.9.2] 2017-10-06

### Fixes

- Making authorized requests
- Making authorized subscriptions

## [v0.9.0] 2017-09-14

Refactored a lot of stuff internally, some API changes. This is a big release.
There will be an additional document describing how subscriptions are constructed, and how they work "under the hood".

### Changes

- We stopped using the term 'resumable' in favour of 'resuming'. Resumable as a passive form is used to describe a resource, on a remote server, whereas Resuming is an active form and better describes the client's behaviour.
- renamed `Instance.subscribe` to `Instance.subscribeNonResuming`
- renamed `Instance.subscribeResumable` to `Instance.subscribeResuming`
- all subscriptions now return an object of type `Subscription`, that can be unsubscribed via `subscription.unsubscribe()`.
-  Removed the `RetryStrategy` in favour of `RetryStrategyOptions`. Any custom config can be passed in there, including limit for maximum number of retries, and the function to increment the wait time.
- Listeners are now passed to subscriptions as a single interface, containing optional callbacks:
    - `onOpen(headers)`,
    - `onSubscribe()`,
    - `onError(error)`,
    - `onEvent(event)`,
    - `onEnd(error)`
- `onError` now returns `any` type, making for easier casting.
- `TokenProvider` is now an interface. Implementers are expected to create their own.
- `TokenProvider` returns a cancelable promise - from the `p-cancelable` library.
- `Logger` now can't be passed to each request anymore. It is now only created as part of `Instance` creation.
- `Instance.request` now returns a `CancelablePromise` from `p-cancelable` library. It does not retry as of now.

## [v0.7.0] 2017-07-19

### Changes

- Renamed the `instance` to `instanceId` when instantiating an `Instance`. `Instance` class now has a parameter `id` that used to be `instance`.
- Won the Internet for the most confusing changelog entries.

## [v0.6.1] 2017-07-10

### Fixes

- `ErrorResponse` `instanceof` now works correctly
- `Retry-After` header is now handled correctly.

## [v0.6.0] 2017-07-05

### Changes

- Changed the artifact name to `pusher-platform`
- Renamed `App` to `Instance`, `appId` to `instanceId`.
- Updated the tenancy to the upcoming standard: https://cluster.and.host/services/serviceName/serviceVersion/instanceId/...

_.. prehistory_
