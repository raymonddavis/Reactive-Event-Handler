import { merge, Observable, of, Subject } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';

class BaseRE {
  static _staticType: Symbol;

  constructor() {
  }
}

interface EventStatic<T extends BaseRE> {
  _staticType: Symbol;
  new(...args: any[]): T;
}

function CustomRE(target: any) {
  target._staticType = Symbol();
}

class HandlerRE {
  $_events = new Subject<any>();

  constructor() {
  }

  public dispatch<T extends BaseRE>(...events: T[]): void {
    events
      .forEach(event => this.$_events.next(event));
  }

  public on<T extends BaseRE>(eventType: EventStatic<T>): Observable<T> {
    return this.$_events
      .pipe(
        filter(e => (e.constructor as EventStatic<BaseRE>)._staticType === eventType._staticType)
      );
  }
}

export {
  BaseRE,
  CustomRE,
  HandlerRE
}
