export interface ZephyrTestCycle {
    projectId?: number;
    name: string;
    description?: string;
    statusId?: number;
    plannedStartDate?: string;
    plannedEndDate?: string;
    folderId?: number;
}