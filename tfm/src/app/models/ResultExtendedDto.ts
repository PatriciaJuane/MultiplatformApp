export class ResultExtendedDto {
    id: number;
    position: number;
    horse: string;
    rider: string;
    club: string;
    points: number;
    time: string;
    competitionName: string;

    constructor(obj?: ResultExtendedDto) {
        Object.assign(this, obj);
    }
}
