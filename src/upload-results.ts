import * as testProjectHelper from './test-project-helper';
import * as testCycleHelper from './test-cycle-helper';
import * as uploadAttachmentHelper from './upload-attachment-helper';
import { format } from 'date-fns';
import { IGitSourceSettings } from './git-source-setting';


export async function uploadResults(settings:IGitSourceSettings): Promise<void> {
    let projId = await testProjectHelper.getProjectId(settings);
    let folderId = await testProjectHelper.createNewFolder(projId, settings.folderName, settings);
    let testCycleId = await testCycleHelper.createNewTestCycle(projId, folderId, getCurrentTimestamp(), settings);
    let uploadFile = await uploadAttachmentHelper.uploadAttachment(testCycleId, settings);
}

export function getCurrentTimestamp(): string {
    const currentDate: Date = new Date();
    const formattedDate: string = format(currentDate, 'ddMMyyyyHHmmss');
    return formattedDate;
}