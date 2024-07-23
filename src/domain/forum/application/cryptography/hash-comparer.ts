export abstract class HashComparer {
    abstract compare(plain: string, hashed: string): Promise<boolean>;
}