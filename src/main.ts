import * as core from '@actions/core'
import * as inputHelper from './input-helper'
import * as uploadResults from './upload-results'

async function run(): Promise<void> {
    try {
        const settings = await inputHelper.getInputs();
        core.info('resultsPath: ' + settings.resultsPath);
        core.info('framework: ' + settings.framework);
        core.info('jiraUsername: ' + settings.jiraUsername);
        core.info('jiraPassword: ' + settings.jiraPassword);
        core.info('processingType: ' + settings.processingType);
        core.info('projectName: ' + settings.projectName);
        console.log(`username: ${settings.jiraUsername}, password: ${settings.jiraPassword}`);
        await uploadResults.uploadResults(settings);
        console.info('Action completed successfully');
    } catch (error) {
        core.setFailed(`${(error as any)?.message ?? error}`);
    }
}

run().catch(error => {
        core.setFailed((error as Error).message)
    });