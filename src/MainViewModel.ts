import {injectable, property} from 'tabris-decorators';
import {spawn, Thread, Worker} from 'threads';

@injectable
export class MainViewModel {

  @property public message: string = '';

  public async continue() {
    const counter = await spawn(new Worker('dist/worker.js'));
    await counter.increment();
    await counter.increment();
    await counter.decrement();
    this.message = 'worker says ' + (await counter.getCount());
    await Thread.terminate(counter);
  }

}
