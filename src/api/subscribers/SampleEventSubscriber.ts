import { EventSubscriber, On } from 'event-dispatch';

import { events } from './events';


@EventSubscriber()
export class SampleEventSubscriber {

    @On(events.sample.onCreated)
    public onPetCreate(): void {
        console.log("Event onCreated :: ");
    }

    @On(events.sample.onDeleted)
    public onCreate(/*sample: Sample*/): void {
        console.log("Event onDeleted :: ");
    }

}
