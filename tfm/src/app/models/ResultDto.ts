export class ResultDto {
    id: number;
    position: number;
    horse: string;
    rider: string;
    club: string;
    points: number;
    time: string;

    constructor(obj?: ResultDto) {
        Object.assign(this, obj);
    }
}
