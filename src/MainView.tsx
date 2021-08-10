import {Composite, TextView, Button, Properties, Stack} from 'tabris';
import {component, bindAll} from 'tabris-decorators';
import {MainViewModel} from './MainViewModel';

@component // Enabled data binding syntax
export class MainView extends Composite {

  @bindAll({
    message: '#label.text'
  })
  public model: MainViewModel;

  constructor(properties: Properties<MainView>) {
    super();
    this.set(properties).append(
      <Stack stretch padding={24} spacing={12} alignment='stretchX'>
        <Button onSelect={() => void this.model.createCounter()}>create counter</Button>
        <Button onSelect={() => void this.model.increment()}>increment</Button>
        <Button onSelect={() => void this.model.print()}>print</Button>
        <Button onSelect={() => void this.model.terminate()}>terminate</Button>
        <TextView id='label' padding={16} font={{size: 24}}/>
      </Stack>
    );
  }

}
