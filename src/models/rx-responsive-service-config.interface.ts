export class IRxResponsiveServiceConfig {
    public xs: IBreakpointConstraint;
    public sm: IBreakpointConstraint;
    public md: IBreakpointConstraint;
    public lg: IBreakpointConstraint;
    public xl: IBreakpointConstraint;
}

export interface IBreakpointConstraint {
    min?: number;
    max?: number;
}

export const DEFAULT_RX_RESPONSIVE_CONFIG: IRxResponsiveServiceConfig = {
    xs: { max: 575 },
    sm: { min: 576, max: 767 },
    md: { min: 768, max: 991 },
    lg: { min: 992, max: 1199 },
    xl: { min: 1200 },
};
