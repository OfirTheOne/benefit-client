import { ReactElement } from 'react';
import { PanelAction } from '../../enums/panel-action.enum';

export interface NavItem {
  icon?: ReactElement;
  text?: string;
  action: PanelAction;
  drawerItems?: NavItem[];
}
