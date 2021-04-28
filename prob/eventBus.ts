type EventName = string | Symbol;
type useMapName = 'eventsNormal' | 'eventsOnce';

class MyEvent {

    eventsNormal: Map<EventName, Function>
    eventsOnce: Map<EventName, Function>

    constructor() {
        this.eventsNormal = new Map();
        this.eventsOnce = new Map();
    }

    addEvent(eventName: EventName, isOnce: boolean, fn: Function, ...args): void {
        const useEventMap = this.getUseEventMapName(isOnce);
        this[useEventMap].set(eventName, (...newArgs) => {
            return fn(...args, ...newArgs);
        })
    }

    on(eventName: EventName, fn: Function, ...args): void {
        this.addEvent(eventName, false, fn, ...args);
    }

    once(eventName: EventName, fn: Function, ...args): void {
        this.addEvent(eventName, true, fn, ...args);
    }

    fire(eventName: EventName, ...args) {
        if (this.eventsNormal.has(eventName)) {
            this.eventsNormal.get(eventName)(...args);
        } else if (this.eventsOnce.has(eventName)) {
            this.eventsOnce.get(eventName)(...args);
            this.eventsOnce.delete(eventName);
        } else {
            throw new Error('无此事件名称');
        }
    }

    remove(eventName: EventName, isOnce: boolean = false): void {
        const useEventMap = this.getUseEventMapName(isOnce);
        if (this[useEventMap].has(eventName)) {
            this[useEventMap].delete(eventName);
        } else {
            throw new Error('无次事件名称');
        }
    }

    private getUseEventMapName(isOnce: boolean): useMapName {
        return isOnce ? 'eventsOnce' : 'eventsNormal';
    }
}

const myEvent = new MyEvent();
const fn1 = (...args) => {
    console.log('测试', ...args)
}
myEvent.on('sleep', fn1, 1, 2, 3);
myEvent.fire('sleep', 4, 5, 6);
myEvent.remove('sleep');
myEvent.once('sleep1', fn1, 1, 2);
myEvent.fire('sleep1');
console.log(myEvent.eventsOnce)