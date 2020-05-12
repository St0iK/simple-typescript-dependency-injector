import { Constructable } from "./Constructable";

/**
 * Class Decorator,  it receives a Constructible function.
 * We are not changing the behavior of the class or constructor function and just returning it as is. 
 * This is mainly for the reason we would like typescript 
 * to add its metadata data to the class so we will be able to reflect it at run time.
 * @param constructor 
 */
export function Injectable(constructor: Constructable): Constructable {
  const original = constructor;
  return original;
}
