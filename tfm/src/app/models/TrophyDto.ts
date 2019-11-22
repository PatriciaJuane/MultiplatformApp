export class TrophyDto {
    id: number;
    name: string;
    category: string;
    arena: string;
    initDate: Date;
    endDate: Date;

    constructor(obj?: TrophyDto) {
        Object.assign(this, obj);
    }
}