const op = require('../');

const object = {
  a: 'a',
  b: 'b',
  c: {
    a: 'ca',
    b: 'cb',
    c: 'cc',
    d: 'cd',
    e: {
      a: {
        a: {
          a: {
            a: 'ceaaaa'
          }
        }
      }
    }
  }
}

test('Test get()', ()=> {
  expect(op.get(object, 'c.b')).toEqual('cb');
  expect(op.get(object, 'c.b.k')).not.toBeDefined();
  expect(op.get(object, 'c.e.a.a.a.a')).toEqual('ceaaaa');
});

test('Test set()', ()=> {
  op.set(object, 'c.b.k'); //This should do nothing
  op.set(object, 'rick.morty', { wuba: 'luba', dubb: 'dubb' });
  expect(op.get(object, 'c.b.k')).not.toBeDefined();
  expect(op.get(object, 'rick.morty.dubb')).toEqual('dubb');
  expect(op.get(object, 'rick.morty.wuba')).toEqual('luba');
});

test('Test unset()', ()=> {
  op.unset(object, 'c.e.a.a.a.a');
  op.unset(object, 'c.b.k'); //This should do nothing
  expect(op.get(object, 'c.b')).toEqual('cb');
  expect(op.get(object, 'c.e.a.a.a.a')).not.toBeDefined();
  expect(op.get(object, 'c.e.a.a.a')).not.toBeDefined();
  expect(op.get(object, 'c.e.a')).not.toBeDefined();
  expect(op.get(object, 'c.e')).not.toBeDefined();
  expect(op.get(object, 'c')).toEqual(object.c);
});

test('Test invalid args', ()=> {
  expect(()=> op.get('hello')).toThrow();
  expect(()=> op.set('hello')).toThrow();
  expect(()=> op.unset('hello')).toThrow();
  expect(()=> op.get(null, 'hello')).toThrow();
  expect(()=> op.get(1, 'hello')).toThrow();
  expect(()=> op.get(object, 1)).toThrow();
  expect(()=> op.get(object)).toThrow();
});
