import { Deactivate } from './deactivate.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<unknown> {
  public canDeactivate(component: Deactivate): boolean {
    return component.canExit();
  }
}
