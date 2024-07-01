export declare class DataObj<A> {
    private data;
    constructor(data: A);
    static create<A>(data: A): DataObj<A>;
}
