export interface IGitSourceSettings {
  /**
   * The location on disk where the repository will be placed
   */
  resultsPath: string

  /**
   * The repository owner
   */
  framework?: string

  /**
   * The repository name
   */
  jiraUsername: string

  /**
   * The ref to fetch
   */
  jiraPassword: string

  /**
   * The commit to checkout
   */
  processingType?: string

  /**
   * Indicates whether to clean the repository
   */
  projectName?: string

  /**
   * Indicates whether to clean the repository
   */
  folderName: string

  /**
   * Indicates whether to clean the repository
   */
  domainUrl: string

}
