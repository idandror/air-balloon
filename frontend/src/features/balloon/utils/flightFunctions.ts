import { Cartesian3, JulianDate, SampledPositionProperty } from 'cesium';
import { Position } from '../interface/balloonInterfaces';

const addFilghtLocation = (
  index: number,
  { longitude, latitude, altitude }: Position,
  positionProperty: SampledPositionProperty,
  start: JulianDate
) => {
  const time = JulianDate.addSeconds(start, index * 30, new JulianDate());
  const position = Cartesian3.fromDegrees(longitude, latitude, altitude);
  positionProperty.addSample(time, position);
};

const generateFlightLocations = ({
  longitude,
  latitude,
  altitude,
}: Position) => {
  const flightLocations = [];
  for (let i = 0; i <= 360; i += 10) {
    const radians = i * (Math.PI / 180);
    flightLocations.push({
      longitude: longitude - 0.1 + 0.1 * Math.cos(radians),
      latitude: latitude + 0.1 * Math.sin(radians),
      altitude: altitude,
    });
  }
  return flightLocations;
};

export const generateFlightData = (
  position: Position,
  positionProperty: SampledPositionProperty,
  start: JulianDate
) => {
  generateFlightLocations(position).forEach((flightLocation, index) =>
    addFilghtLocation(index, flightLocation, positionProperty, start)
  );
};
