import { merge, Observable, of, Subject } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';

import { BaseRE, CustomRE, HandlerRE } from './REH'

@CustomRE
class UserCreated extends BaseRE {
  constructor(public user: User) {
    super();
  }
}

@CustomRE
class UserUpdated extends BaseRE {
  constructor(public user: User) {
    super();
  }
}

interface User {
  name: string;
  age?: number;
  email?: string;
}

const $eventHandler: HandlerRE = new HandlerRE();

const $userCreated = $eventHandler.on(UserCreated)
const $userUpdated = $eventHandler.on(UserUpdated)

merge(
  $userCreated,
  $userUpdated
)
.subscribe(res => console.log(res));

let user: User = {
  name: 'Ray'
}

const events = [
  new UserCreated(user)
];

// $eventHandler.fire(new UserCreated(user))

user.age = 26;
// $eventHandler.fire(new UserUpdated(user))

events.push(new UserUpdated(user));

$eventHandler.dispatch(...events);
