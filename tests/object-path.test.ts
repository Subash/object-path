import { expect, test } from "@jest/globals";
import * as op from "../src/object-path";

const object = {
  a: "a",
  b: "b",
  c: {
    a: "ca",
    b: "cb",
    c: "cc",
    d: "cd",
    e: {
      a: {
        a: {
          a: {
            a: "ceaaaa",
          },
        },
      },
    },
  },
};

test("Test get()", () => {
  expect(op.get(object, "c.b")).toEqual("cb");
  expect(op.get(object, "c.b.k")).not.toBeDefined();
  expect(op.get(object, "c.e.a.a.a.a")).toEqual("ceaaaa");
  expect(op.get(object, "c.e.a.a.a.a.hi")).toBeUndefined();
});

test("Test set()", () => {
  op.set(object, "rick.morty", { wuba: "luba", dubb: "dubb" });
  op.set(object, "c.e.a.a.a.a.hi", "test");
  expect(op.get(object, "c.e.a.a.a.a.hi")).toBeUndefined();
  expect(op.get(object, "c.b.k")).not.toBeDefined();
  expect(op.get(object, "rick.morty.dubb")).toEqual("dubb");
  expect(op.get(object, "rick.morty.wuba")).toEqual("luba");
});

test("Test unset()", () => {
  op.unset(object, "c.e.a.a.a.a");
  op.unset(object, "c.b.k"); // this should do nothing
  expect(op.get(object, "c.b")).toEqual("cb");
  expect(op.get(object, "c.e.a.a.a.a")).not.toBeDefined();
  expect(op.get(object, "c.e.a.a.a")).not.toBeDefined();
  expect(op.get(object, "c.e.a")).not.toBeDefined();
  expect(op.get(object, "c.e")).not.toBeDefined();
  expect(op.get(object, "c")).toEqual(object.c);
});
