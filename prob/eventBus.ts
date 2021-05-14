type EventName = string | Symbol;

class MyEvent {

    eventsNormal: Map<EventName, Function>
    eventsOnce: Map<EventName, Function>

    constructor() {
        this.eventsNormal = new Map();
        this.eventsOnce = new Map();
    }

    private bindEvent(eventName: EventName, isOnce: boolean, fn: Function, ...args): void {
        const useEventMap = this.getUseEventMap(isOnce);
        useEventMap.set(eventName, (...newArgs) => {
            return fn(...args, ...newArgs);
        })
    }

    addEvent(eventName: EventName, fn: Function, ...args): void {
        this.bindEvent(eventName, false, fn, ...args);
    }

    addOneTimeEvent(eventName: EventName, fn: Function, ...args): void {
        this.bindEvent(eventName, true, fn, ...args);
    }

    execute(eventName: EventName, ...args) {
        if (this.eventsNormal.has(eventName)) {
            this.eventsNormal.get(eventName)(...args);
        } else if (this.eventsOnce.has(eventName)) {
            this.eventsOnce.get(eventName)(...args);
            this.eventsOnce.delete(eventName);
        } else {
            console.error('无此事件名称');
            // throw new Error('无此事件名称');
        }
    }

    remove(eventName: EventName, isOnce: boolean = false): void {
        const useEventMap = this.getUseEventMap(isOnce);
        if (useEventMap.has(eventName)) {
            useEventMap.delete(eventName);
        } else {
            console.error('无次事件名称');
            // throw new Error('无次事件名称');
        }
    }

    private getUseEventMap(isOnce: boolean): Map<EventName, Function> {
        return isOnce ? this.eventsOnce : this.eventsNormal;
    }
}

const myEvent = new MyEvent();
const fn1 = (...args) => {
    console.log('测试', ...args)
}
myEvent.addEvent('sleep', fn1, 1, 2, 3);
myEvent.execute('sleep', 4, 5, 6);
myEvent.remove('sleep');
myEvent.addOneTimeEvent('sleep1', fn1, 1, 2);
myEvent.execute('sleep1');
console.log(myEvent.eventsOnce)