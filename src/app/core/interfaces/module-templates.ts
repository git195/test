import { Module } from './module';
import { Template } from './template';

export interface ModuleTemplates extends Module {
    templates: Array<Template>;
}