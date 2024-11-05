import { IGitSourceSettings } from './git-source-setting';
import * as apiHelper from './api-helper';
import { UrlHelper } from './UrlHelper';
import { ZephyrTestRunStatus } from './DTOs/ZephyrTestRunStatus';
import { ZephyrTestFolder } from './DTOs';

export enum testRunStatus {
    Pass = 'Pass',
    Fail = 'Fail',
    InProgress = 'In Progress',
    NotExecuted = 'Not Executed',
    Blocked = 'Blocked',
    Done = 'Done'
}

export async function getProjectId(settings: IGitSourceSettings): Promise<any> {
    let response = await apiHelper.getApiClient(settings.domainUrl, UrlHelper.allProjects, settings);
    return response.find((project: any) => project.name === settings.projectName).id;
}

export async function getTestRunStatus(projectId: number, settings: IGitSourceSettings): Promise<any> {
    let response = await apiHelper.getApiClient(settings.domainUrl, UrlHelper.getCycleStatusInfo(projectId), settings);
    return response;
}

export function getTestRunStatusId(zephyrTestRunStatus: ZephyrTestRunStatus[], statusName: string): any {
    const status = zephyrTestRunStatus.find((status: ZephyrTestRunStatus) => status.name === statusName);
    return status?.id;
}

export async function getAllowedTestRunStatuses(projectId: number, settings: IGitSourceSettings): Promise<Record<string, number>> {
    const zephyrTestRunStatuses = await getTestRunStatus(projectId, settings);
    const allowedTestRunStatuses: Record<string, number> = {
        [testRunStatus.Pass]: getTestRunStatusId(zephyrTestRunStatuses, testRunStatus.Pass),
        [testRunStatus.Fail]: getTestRunStatusId(zephyrTestRunStatuses, testRunStatus.Fail),
        [testRunStatus.InProgress]: getTestRunStatusId(zephyrTestRunStatuses, testRunStatus.InProgress),
        [testRunStatus.NotExecuted]: getTestRunStatusId(zephyrTestRunStatuses, testRunStatus.NotExecuted),
        [testRunStatus.Blocked]: getTestRunStatusId(zephyrTestRunStatuses, testRunStatus.Blocked),
        [testRunStatus.Done]: getTestRunStatusId(zephyrTestRunStatuses, testRunStatus.Done)
    }
    return allowedTestRunStatuses;
}

export async function getFoldersInTestProject(projectId: number, settings: IGitSourceSettings): Promise<any> {
    return await apiHelper.getApiClient(settings.domainUrl, UrlHelper.getCycleFolders(projectId), settings);
}

export async function isFolderExistsInProject(projectId: number, folderName: string, settings: IGitSourceSettings): Promise<any> {
    const response = await getFoldersInTestProject(projectId, settings);
    const folder = response.children.find((folder: ZephyrTestFolder) => folder.name === folderName);
    return folder !== undefined ? folder.id : 0;
}

export async function createNewFolder(projectId: number, folderName: string, settings: IGitSourceSettings): Promise<any> {
    const folderId = await isFolderExistsInProject(projectId, folderName, settings);
    if (folderId !== 0) {
        return folderId;
    } else {
        const testFolder: ZephyrTestFolder = {
            name: folderName,
            projectId: Number(projectId),
            index: 0
        };
        const response = await apiHelper.postApiClient(settings.domainUrl, UrlHelper.createFolder, settings, testFolder);
        if (response.id === 1) {
            return await isFolderExistsInProject(projectId, folderName, settings);
        }
        return 'Unable to create folder';
    }
}