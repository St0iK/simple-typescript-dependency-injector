import { Injectable } from "Injectable.ts";
import { Injector } from "Injector.ts";
const readableMessage = "Hello from MockClassNoArgs";

@Injectable
export class MockClassNoArgs {
  constructor() {
  }

  sayHello() {
    return "Hello from MockClassNoArgs";
  }
}

@Injectable
export class MockClass1Args {
  constructor(public mock: MockClassNoArgs) {
  }
}
@Injectable
class MockClassDeepArgs {
  constructor(public mock: MockClassNoArgs, public mock2: MockClass1Args) {
  }
}

describe("Di should work", () => {
  const injector = new Injector();
  beforeEach(() => {
  });
  afterEach(() => {
  });
  test("it should inject a not null object", () => {
    let injected = injector.getInstance<MockClassNoArgs>(MockClassNoArgs);
    expect(injected).not.toBe(undefined);
  });
  test("it should inject a not null object and use methods on it", () => {
    let injected = injector.getInstance(MockClassNoArgs);
    const hello = injected.sayHello();
    expect(hello).toBe(readableMessage);
  });
  test("it should be able to inject a dependable class", () => {
    let injected = injector.getInstance(MockClass1Args);
    const hello = injected.mock.sayHello();
    expect(hello).toBe(readableMessage);
  });
  test("it should be able to inject a dependable class with a dependable class (2 levels down)", () => {
    let injected = injector.getInstance(MockClassDeepArgs);
    const hello = injected.mock.sayHello();
    const hello2 = injected.mock2.mock.sayHello();
    expect(hello).toBe(readableMessage);
    expect(hello2).toBe(readableMessage);
  });
});
