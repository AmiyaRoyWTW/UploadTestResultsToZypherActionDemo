export class UrlHelper
{
    public static readonly zypherTestURI: string = "/rest/tests/1.0/";
    public static readonly createTestCycle: string = UrlHelper.zypherTestURI+"testrun";
    public static readonly addTestCasesToTestCycle: string = UrlHelper.zypherTestURI + "testrunitem/bulk/save";
    public static getTestCycle(cycleId: number): string {
        return UrlHelper.zypherTestURI+`testrun/${cycleId}/testrunitems?fields=id,index,issueCount,$lastTestResult`;
    }
    public static getCycleStatusInfo(projectId: number): string {
        return UrlHelper.zypherTestURI + `project/${projectId}/testrunstatus`;
    }
    public static getTestCaseStatusInfo(projectId: number): string {
        return UrlHelper.zypherTestURI + `project/${projectId}/testresultstatus`;
    }
    public static readonly testResult: string = UrlHelper.zypherTestURI + "testresult";
    public static testCaseSearch(projectId: number, maxResults: number = 2000, startAt: number = 0): string {
        return UrlHelper.zypherTestURI + `testcase/search?fields=id,key&maxResults=${maxResults}&startAt=${startAt}&query=testCase.projectId+IN+(${projectId})`;
    }
    public static readonly testExecutionUpdate: string = UrlHelper.zypherTestURI + "testresult";
    public static uploadAttachment(cycleId: number): string {
        return UrlHelper.zypherTestURI + `testrun/${cycleId}/attachment`;
    }
    public static getCycleInfo(projectId: number): string {
        return UrlHelper.zypherTestURI + `testrun/search?fields=id,name&query=testRun.projectId+IN+(${projectId})`;
    }
    public static getCycleFolders(projectId: number): string {
        return UrlHelper.zypherTestURI + `project/${projectId}/foldertree/testrun`;
    }
    public static readonly createFolder: string = UrlHelper.zypherTestURI + "folder/testrun";
    public static readonly allProjects: string = UrlHelper.zypherTestURI + "project";
}