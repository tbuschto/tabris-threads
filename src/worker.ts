console.log(global.Window?.toString());
delete global.Window; // Workaround: make threads understand this is a worker
console.log('worker.ts');

import {tabris} from 'tabris';

// error handling, flush
window.onmessage = function(data: {}) {
  tabris._notify(tabris.cid, 'message', data);
}

// dispatch as window event
tabris.on('message', tabrisEvent => {
  const event = new Event('message');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event as any).data = (tabrisEvent as any).data;
  window.dispatchEvent(event);
});

import {expose} from 'threads/worker';

const orgAEL = self.addEventListener;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(self as any).addEventListener = function(type: string, listener: any) {
  console.log('AEL spy: ' + type + ' ' + listener.toString());
  orgAEL.call(self, type, listener);
}

const orgPM = self.postMessage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(self as any).postMessage = function(arg1: any, arg2: any) {
  console.log('PM spy: ' + JSON.stringify(arg1));
  orgPM.call(self, arg1, arg2);
}

self.addEventListener("message", ev => console.log('message spy: ' + JSON.stringify(ev.data)));

let currentCount = 0;

export const counter = {
  getCount() {
    console.log('worker: getCount');
    return currentCount;
  },
  increment() {
    console.log('worker: increment');
    return ++currentCount;
  },
  decrement() {
    console.log('worker: decrement');
    return --currentCount;
  }
};

console.log('expose');
expose(counter);
console.log('worker.ts end');
