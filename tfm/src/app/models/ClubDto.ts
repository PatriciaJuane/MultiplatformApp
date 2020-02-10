export class ClubDto {
    id: number;
    name: string;
    country: string;
    location: string;
    website: string;
    size: string;

    constructor(obj?: ClubDto) {
        Object.assign(this, obj);
    }
}
