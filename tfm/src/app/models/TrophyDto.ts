import { ResultDto } from './ResultDto';

export class TrophyDto {
    id: number;
    name: string;
    category: string;
    arena: string;
    initDate: Date;
    hour: string;
    competitionId: string;
    results: ResultDto[];

    constructor(obj?: TrophyDto) {
        Object.assign(this, obj);
    }
}
