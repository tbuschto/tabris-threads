## Issue 1:

Android only, blocking

global constructor "Window" makes threads.js not detect a worker correctly. However, there is no such constructor put in to global scope in the tabris bootstrap. Created by native?

Workaround:

```ts
delete global.Window;
```

## Issue 2:

Android only ... fixed itself?

sometimes worker says:
Could not start tabris: Only the original thread that created a view hierarchy can touch its views.

followed by blank screen on reload (status/nav bar only)

It seems to work after the hacks in worker.ts, not sure why.

## Issue 3:

cross-platform, blocking

"TypeError: undefined is not a function" (Android)

https://github.com/eclipsesource/tabris-android/blob/4c0e6312779c37d3a9c7a9a9a2137b1517ad0e71/tabris/src/main/java/com/eclipsesource/tabris/android/internal/nativeobject/worker/Worker.kt#L140

"Function 'onmessage' not found" (iOS)

https://github.com/eclipsesource/tabris-ios/blob/d4a500fdbe8e191983cb3b9e6e7221ac98eefe1c/Tabris/Tabris/Classes/BindingPostWorkerMessageOperation.swift#L23

This is because threads.js does not put a "onmessage" function in global scope, as tabris assumes, but properly registers event listeners on the global object via DOM event. Putting a "onmessage" function in global scope that dispatches a Event object on the global object works around this issue.

## Issue 4:

No stack traces for errors in workers.

because "onmessage" function is called directly from native side and thus does not have the error handling of tabris._notify. This also means there is no flush handled, which may cause further issues. Fix: dispatch worker message events on the tabris object and let JS handle it from there.

## Issue 5:
no console output on remote CLI

Since this is done with a websocket, and the CLI can handle only one connection, this is to be expected.

The fix could be to pass messages on to the main thread instead of printing them directly. Some research required.
