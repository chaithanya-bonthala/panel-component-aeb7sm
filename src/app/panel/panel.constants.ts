export interface ITransitions {
    IN: boolean;
    OUT: boolean;
}

export interface IPanelConfig {
    hasOverlay?: boolean;
    headerContainerClass?: string;
    bodyContainerClass?: string;
}

export const DEFAULTCONFIG: IPanelConfig = {
    hasOverlay: true
}

export const TRANSITIONS: ITransitions = {
    IN: true,
    OUT: false
}

