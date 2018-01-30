import { IBreakpointConstraint } from './breakpoint-constraint.interface';

export interface IDynamicMediaConfig {
    [key: string]: IBreakpointConstraint;
}
