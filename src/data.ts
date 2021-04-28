import { Nullable } from "./structures/general";

export interface ControllerConfig {
  wallet: string;
}

export class KevaDataController {
  private wallet: string;
  constructor(config: ControllerConfig) {
    // For the update/write fees
    this.wallet = config.wallet;
  }

  // New, no revisions
  public createNew(key: string, content: any) {
    // Assume new, save directly
  }

  // "git branch" or "use as template" equivalent
  public createFromRevision(key: string, revision: string, newContent: any) {
    // Fetch revision, get diffs, store changes?
  }

  // Retrieve a specific revision, default to lates
  public getByKey(key: string, revision = "latest") {
    // get some revision
  }

  // Same as checking out a commit hash
  public getByRevision(revisionId: string) {
    // Assuming revisions are UUID or similar non-repeated tokens
  }

  // ...update, delete
}
