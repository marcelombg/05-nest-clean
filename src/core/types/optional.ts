/**
 * Make some property optional on type
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 **/
export type Optional<T, К extends keyof T> = Pick<Partial<T>, К> & Omit<T, К>
