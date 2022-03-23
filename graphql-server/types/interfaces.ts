import { BalloonColor, BalloonType } from './enums';

export interface IBalloon {
  id?: string;
  name: string;
  description: string;
  type: BalloonType;
  color: BalloonColor;
  longitude: number;
  latitude: number;
  altitude: number;
}
