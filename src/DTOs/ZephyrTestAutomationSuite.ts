import { LastTestResult } from "./LastTestResult";

export interface ZephyrTestAutomationSuite {
    index: number;
    id: number;
    issueCount: number;
    lastTestResult: LastTestResult
}