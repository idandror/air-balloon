export interface balloonState {
  balloons: Balloon[] | null;
  balloon?: Balloon;
  activePos?: Position;
  isError: error | undefined;
  isSuccess: boolean;
  isLoading: boolean;
}

export interface Balloon {
  id?: string;
  name: String;
  description: String;
  type: string;
  color: string;
  longitude: number;
  latitude: number;
  altitude: number;
}
export interface Position {
  longitude: number;
  latitude: number;
  altitude: number;
}
export type error = {
  statusCode: number;
  message: string;
};
