import { Deactivate } from './deactivate.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<unknown> {
  /**
   * @param  {Deactivate} component
   * @returns boolean
   * Use related component's canExit() function to determine deactivation.
   */
  public canDeactivate(component: Deactivate): boolean {
    return component.canExit();
  }
}
