console.log(global.Window.toString());
delete global.Window; // Workaround: make threads understand this is a worker
console.log('worker.ts');

import {expose} from 'threads/worker';

console.log(expose);

let currentCount = 0;

const counter = {
  getCount() {
    return currentCount;
  },
  increment() {
    return ++currentCount;
  },
  decrement() {
    return --currentCount;
  }
};

console.log('expose');
expose(counter);
console.log('worker.ts end');
