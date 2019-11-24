import { HorseDto } from './HorseDto';
import { RiderDto } from './RiderDto';
import { ClubDto } from './ClubDto';

export class ResultDto {
    id: number;
    position: number;
    horse: HorseDto;
    rider: RiderDto;
    club: ClubDto;
    points: number;
    time: string;

    constructor(obj?: ResultDto) {
        Object.assign(this, obj);
    }
}
