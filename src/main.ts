import * as core from '@actions/core'
import * as inputHelper from './input-helper'

async function run(): Promise<void> {
    try {
        const settings = await inputHelper.getInputs()
        core.info('resultsPath: ' + settings.resultsPath)
        core.info('framework: ' + settings.framework)
        core.info('jiraUsername: ' + settings.jiraUsername)
        core.info('jiraPassword: ' + settings.jiraPassword)
        core.info('processingType: ' + settings.processingType)
        core.info('projectName: ' + settings.projectName)
        core.info('Action completed successfully')
    } catch (error) {
        core.setFailed(`${(error as any)?.message ?? error}`)
    }

    run();
}