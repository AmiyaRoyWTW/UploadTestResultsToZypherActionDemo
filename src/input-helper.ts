import * as core from '@actions/core'
import { IGitSourceSettings } from './git-source-setting'

export async function getInputs(): Promise<IGitSourceSettings>{
    return {
        resultsPath: core.getInput('resultsPath'),
        framework: core.getInput('framework'),
        jiraUsername: core.getInput('jiraUsername'),
        jiraPassword: core.getInput('jiraPassword'),
        processingType: core.getInput('processingType'),
        projectName: core.getInput('projectName'),
        folderName: core.getInput('testType'),
        domainUrl: core.getInput('domainUrl')
    }
}