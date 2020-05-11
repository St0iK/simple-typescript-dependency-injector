import { Constructable } from "./Constructable.ts";

export class Injector {
  private diMap = new Map();

  /**
   * Receive an instance of a Constructable Object
   * Using generics, it will return the type it has taken
   * @param contr 
   */
  getInstance<T>(contr: Constructable<T>): T {
    const instance = this.constructObject(contr);
    return instance;
  }

  /**
   * Get the right object returned
   * @param constructor 
   */
  private constructObject(constructor: Constructable) {
    // Do we have  the current instance in our Map?
    let currentInstance = this.diMap.get(constructor);
    if (currentInstance) return currentInstance;

    // get the metadata of the class using reflection
    const metaData: Constructable[] = Reflect.getMetadata(
      "design:paramtypes",
      constructor,
    );

    // We need to init each constructor function into it's instance
    const argumentsInstances = metaData.map((params) =>
      this.constructObject(params)
    );

    // build the current instance, and store it to our Map
    currentInstance = new constructor(...argumentsInstances);
    this.diMap.setKey(constructor, currentInstance);

    return currentInstance;
  }
}
