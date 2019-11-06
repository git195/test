export interface TemplateDesign {
    defaultValue?: string;
    description?: string;
    isShow?: boolean;
    label?: string;
    mandatoryOperator?: string;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    required?: boolean;
    row: number;
    type: string;
    visibilityConditionOption?: string;
}