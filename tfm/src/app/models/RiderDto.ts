export class RiderDto {
    id: number;
    name: string;
    country: string;
    age: number;
    license: string;

    constructor(obj?: RiderDto) {
        Object.assign(this, obj);
    }
}
