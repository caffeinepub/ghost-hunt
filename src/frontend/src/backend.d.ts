import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Score = bigint;
export interface backendInterface {
    addScore(points: bigint): Promise<void>;
    getScore(): Promise<Score>;
    getTopScores(limit: bigint): Promise<Array<[Principal, Score]>>;
    resetScore(): Promise<void>;
}
