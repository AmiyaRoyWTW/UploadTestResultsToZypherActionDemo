import { IGitSourceSettings } from './git-source-setting'
import base64 from 'js-base64'
import axios from 'axios'

export async function getApiClient(url: string, uri: string, settings: IGitSourceSettings): Promise<any> {
    try {
        console.log(`username: ${settings.jiraUsername}, password: ${settings.jiraPassword}`);
        const response = await axios.get(url + uri, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(settings.jiraUsername + ':' + settings.jiraPassword),
            }
        });
        if (response !== undefined) {
            return response.data;
        }
        else throw new Error('No response found');
        } catch (error) {
            console.error(error);
    }
}

export async function postApiClient(url: string, uri: string, settings: IGitSourceSettings, data: any): Promise<any> {
    try {
        const response = await axios.post(url + uri, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(settings.jiraUsername + ':' + settings.jiraPassword),
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function postFileApiClient(url: string, uri: string, settings: IGitSourceSettings, data: any): Promise<any> {
    try {
        const response = await axios.post(url + uri, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Basic ' + base64.encode(settings.jiraUsername + ':' + settings.jiraPassword)
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
