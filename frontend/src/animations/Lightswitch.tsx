import { randomBetween } from "../util/Functions";

export function lightBoard(dims: number[]) {
    let base: boolean[][] = [];
    dims.forEach((n, index) => {
        base.push([]);
        for (let i = 0; i < n; i++) {
        base[index].push(false);
        }
    });
    return base;
}

export function flicker(n: number) {
    let bools: boolean[] = [];
    for (let i = 0; i < n; i++) {
        bools.push(randomBetween(0, 1) === 1);
    }
    //ensures every list will have at least one flashing light. Otherwise the graphic doesn't work.
    let index = randomBetween(0, n-1);
    bools[index] = true;
    return bools;
}