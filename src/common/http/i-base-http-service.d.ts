export interface IBaseHttpService<T> {
    readonly get: (id: number) => Promise<T>;
    readonly post: (data: T) => Promise<T>;
    readonly put: (id: number, data: Partial<T>) => Promise<T>;
    readonly patch: (id: number, data: Partial<T>) => Promise<T>;
    readonly delete: (id: number) => Promise<T>;
}
