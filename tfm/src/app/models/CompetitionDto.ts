export class CompetitionDto {
    id: number;
    name: string;
    location: string;
    country: string;
    initDate: Date;
    endDate: Date;
    website: string;
    type: string;
    category: string;

    constructor(obj?: CompetitionDto) {
        Object.assign(this, obj);
    }
}