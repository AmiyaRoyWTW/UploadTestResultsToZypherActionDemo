import { IGitSourceSettings } from './git-source-setting';
import * as apiHelper from './api-helper';
import * as testProjectHelper from './test-project-helper';
import { UrlHelper } from './UrlHelper';
import { ZephyrTestCycle } from './DTOs';

export async function getAllTestCycles(projectId: number, settings: IGitSourceSettings): Promise<any> {
    let response = await apiHelper.getApiClient(settings.domainUrl, UrlHelper.getCycleInfo(projectId), settings);
    return response.results;
}

export async function isTestCycleExists(projectId: number, cycleName: string, settings: IGitSourceSettings): Promise<any> {
    let testCycles = await getAllTestCycles(projectId, settings);
    let cycle = testCycles.find((cycle: any) => cycle.name === cycleName);
    return cycle !== undefined ? cycle.id : 0;
}

export async function createNewTestCycle(projectId: number, folderId: number, cycleName: string, settings: IGitSourceSettings): Promise<any> {
    let cycleId = await isTestCycleExists(projectId, cycleName, settings);
    if (cycleId !== 0) {
        return cycleId;
    } else {
        let testRunStatuses = await testProjectHelper.getAllowedTestRunStatuses(projectId, settings);
        let testCycle: ZephyrTestCycle = {
            name: cycleName,
            projectId: Number(projectId),
            folderId: folderId,
            statusId: testRunStatuses[testProjectHelper.testRunStatus.NotExecuted]
        }
        let response = await apiHelper.postApiClient(settings.domainUrl, UrlHelper.createTestCycle, settings, testCycle);
        if (response !== undefined) {
            return response.data.id;
        } else {
            return 0;
        }
    }
}