# Manipulate Object with Key Paths

### Installation
```shell
npm install --save @sbspk/object-path
```

### Usage

```js
const op = require('object-path');

const data = {
  inner: {
    a: 'b'
  }
}

op.get(data, 'inner.a'); // returns b
op.set(data, 'inner.a', 'c'); // sets the value to c
op.unset(data, 'inner.a') // removes a and inner because inner becomes empty after deleting a
op.set(data, 'hello.world', { greeting: 'whoaa' }); //sets data.hello.world.greeting
op.get(data, 'hello.world.greeting'); //returns 'whoaa'
```