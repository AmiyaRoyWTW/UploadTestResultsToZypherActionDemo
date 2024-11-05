import { ZephyrTestCycle } from './ZephyrTestCycle';
export interface ZephyrConfig{
    baseUrl: string;
    userName: string;
    password: string;
    projectName: string;
    apiToken: string;
    zephyrTestCycle: ZephyrTestCycle;
}