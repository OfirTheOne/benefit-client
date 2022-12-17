import { map, sum } from 'lodash';

export function stringToBytesSum (text: string): number {
  return sum(map(text, char => char.charCodeAt(0)));
}