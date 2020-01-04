import { ResultDto } from './ResultDto';

export class TrophyDto {
    id: number;
    name: string;
    category: string;
    arena: string;
    initDate: Date;
    competitionId: string;
    results: ResultDto[];

    constructor(obj?: TrophyDto) {
        Object.assign(this, obj);
    }
}