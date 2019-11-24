export class HorseDto {
    id: number;
    name: string;
    colour: string;
    age: number;
    breed: string;
    license: string;

    constructor(obj?: HorseDto) {
        Object.assign(this, obj);
    }
}
