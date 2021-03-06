import {int} from "./int";

export function round(n: number, d: number = 0): number {
    let fr = 10 ** d;
    // @ts-ignore
    return int(n * fr) / fr;
}
