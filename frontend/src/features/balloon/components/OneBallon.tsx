import { Entity } from 'resium';
import React from 'react';
import {
  JulianDate,
  SampledPositionProperty,
  TimeIntervalCollection,
  TimeInterval,
  PathGraphics,
  VelocityOrientationProperty,
  Color,
} from 'cesium';

import {
  setBalloon,
} from '../reduxSlice/balloonSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateFlightData } from '../utils/flightFunctions';
import { Balloon, Position } from '../interface/balloonInterfaces';

const airplaneUriWhite = require('../assets/CesiumWhiteBalloon.glb');

const OneBallon: React.FC<{
  balloon: Balloon;
  start: JulianDate;
  stop: JulianDate;
}> = ({ balloon, start, stop }) => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.balloons.balloon?.id);

  const positionProperty = new SampledPositionProperty();
  const position: Position = {
    longitude: balloon.longitude,
    latitude: balloon.latitude,
    altitude: balloon.altitude,
  };
  let size = 1;
  switch (balloon.type) {
    case 'small':
      size = 2;
      break;
    case 'medium':
      size = 3;
      break;
    case 'big':
      size = 4;
      break;
    case 'double':
      size = 5;
      break;

    default:
      size = 2;
      break;
  }
  generateFlightData(position, positionProperty, start);
  const airplaneLine = (
    <Entity
      availability={
        new TimeIntervalCollection([
          new TimeInterval({ start: start, stop: stop }),
        ])
      }
      position={positionProperty}
      model={{
        uri: airplaneUriWhite,
        minimumPixelSize: 1280 * size,
        maximumScale: 1280 * size,
        color: Color.fromCssColorString(balloon.color),
      }}
      orientation={new VelocityOrientationProperty(positionProperty)}
      path={new PathGraphics({ width: 3 })}
      selected={balloon.id === id}
      tracked={balloon.id === id}
      onClick={() => dispatch(setBalloon(balloon))}
      description={`balloon ${balloon.name}`}
    ></Entity>
  );

  return airplaneLine;
};

export default OneBallon;
