import {injectable, property} from 'tabris-decorators';
import {ModuleThread, spawn, Thread, Worker} from 'threads';
import type {counter} from './worker';

@injectable
export class MainViewModel {

  @property public message: string = '';
  private counter: ModuleThread<typeof counter>;

  public async createCounter() {
    this.message = 'Working...';
    this.counter = await spawn<typeof counter>(new Worker('dist/worker.js'));
    if (this.counter.increment instanceof Function) {
      this.message = 'Success!';
    }
  }

  public async increment() {
    this.message = 'Working...';
    await this.counter.increment();
    this.message = 'Success!';
  }

  public async print() {
    this.message = 'Working...';
    this.message = 'worker says ' + (await this.counter.getCount());
  }

  public async terminate() {
    this.message = 'Working...';
    await Thread.terminate(this.counter);
    this.message = 'Success!';
  }

}
