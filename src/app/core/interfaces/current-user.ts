import { CurrentAccount } from './account';
import { ModuleTemplates } from './module-templates';
import { ReportingStructureLevel } from './reporting-structure-level';

export interface CurrentUser {
    account: CurrentAccount;
    accountName: string;
    modulesTemplates: Array<ModuleTemplates>;
    reportingStructure: Array<ReportingStructureLevel>;
}