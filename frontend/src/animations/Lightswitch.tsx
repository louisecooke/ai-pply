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

/* export function flicker(n: number[], counter: number) {
    let config: boolean[][] = [];
    if (counter % 4 === 0) {
        return []; //empty;
    }
    n.forEach((val, index) => {
        config.push([]);
        for (let i = 0; i < val; i++) {
            let on = randomBetween(0, 1) === 1;
            config[index].push(on);
        }
    }
    );
    return config;
} */

export function flicker(n: number) {
    let bools: boolean[] = [];
    for (let i = 0; i < n; i++) {
        bools.push(randomBetween(0, 1) === 1);
    }
    return bools;
}