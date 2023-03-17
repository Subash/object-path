### Installation

```shell
npm install --save @sbspk/object-path
```

### Usage

```js
import { get, set, unset } from "@sbspk/object-path";

const data = {
  inner: {
    a: "b",
  },
};

get(data, "inner.a"); // returns b
set(data, "inner.a", "c"); // sets the value to c
unset(data, "inner.a"); // removes a and inner because inner becomes empty after unsetting a
set(data, "hello.world", { greeting: "Namaste" }); // sets data.hello.world.greeting
get(data, "hello.world.greeting"); // returns 'Namaste'
```
