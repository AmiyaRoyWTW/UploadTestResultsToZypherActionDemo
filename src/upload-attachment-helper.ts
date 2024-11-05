import { IGitSourceSettings } from './git-source-setting';
import * as apiHelper from './api-helper';
import { UrlHelper } from './UrlHelper';
import * as fs from 'fs';

export async function uploadAttachment(cycleId: number, settings: IGitSourceSettings): Promise<any> {
    let file = new File([fs.readFileSync(settings.resultsPath)], settings.resultsPath);
    let fileName = file.name.split('\\').pop();
    const formData = new FormData();
    formData.append('file', file, fileName);
    let response = await apiHelper.postFileApiClient(settings.domainUrl, UrlHelper.uploadAttachment(cycleId), settings, formData);
    return response;
}