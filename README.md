## Blocking Issue 1:

Android only

global constructor "Window" makes threads.js not detect a worker correctly. However, there is no such constructor put in to global scope in the tabris bootstrap. Created by native?

Workaround:

```ts
delete global.Window;
```

## Blocking Issue 2:

Android only

sometimes worker says:
Could not start tabris: Only the original thread that created a view hierarchy can touch its views.

but only sometimes

followed by blank screen on reload (status/nav bar only)

## Blocking Issue 4:

"TypeError: undefined is not a function" (Android)

https://github.com/eclipsesource/tabris-android/blob/4c0e6312779c37d3a9c7a9a9a2137b1517ad0e71/tabris/src/main/java/com/eclipsesource/tabris/android/internal/nativeobject/worker/Worker.kt#L140

"Function 'onmessage' not found" (iOS)

https://github.com/eclipsesource/tabris-ios/blob/d4a500fdbe8e191983cb3b9e6e7221ac98eefe1c/Tabris/Tabris/Classes/BindingPostWorkerMessageOperation.swift#L23

## General Issues in worker:

### console output not on CLI

because no websocket is started?
fix: pipe errors through to main thread?


### No stack traces on error

because "onmessage" it's not wrapped
