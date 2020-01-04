import { TrophyDto } from './TrophyDto';

export class CompetitionDto {
    id: number;
    name: string;
    country: string;
    location: string;
    initDate: Date;
    endDate: Date;
    website: string;
    type: string;
    category: string;
    trophys: TrophyDto[];

    constructor(obj?: CompetitionDto) {
        Object.assign(this, obj);
    }
}