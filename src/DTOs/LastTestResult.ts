import { TestCase } from "./TestCase";

export interface LastTestResult {
    id: number;
    testResultStatusId: number;
    testCase: TestCase
}