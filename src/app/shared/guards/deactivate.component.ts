/**
 * Deactivate interface created for further usage of canDeactivate guard.
 */
export interface Deactivate {
    canExit(value?: boolean): boolean;
}