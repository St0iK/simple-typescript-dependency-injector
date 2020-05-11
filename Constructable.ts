/**
 * Constructable Interface
 * 
 */
export interface Constructable<T = any> {
  // Constructs a new object of type 'T' (Generics)
  new (...params: any): T;
}
