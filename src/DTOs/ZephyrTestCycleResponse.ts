import { ZephyrTestCycle } from './ZephyrTestCycle';

export interface ZephyrTestCycleResponse {
    id: number;
    key: string;
    testRunItems: ZephyrTestCycle[];
}