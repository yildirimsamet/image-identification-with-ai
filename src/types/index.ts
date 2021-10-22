export interface ICocoResultObject {
    bbox:number[];
    class:string;
    score:number;
}
export interface IDetectedArea {
    bbox:number[];
    name:string;
    score:number;
    zIndex:number;
}