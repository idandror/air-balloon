import {
  Cartesian3,
  Cartographic,
  ClockRange,
  JulianDate,
  Viewer as CesiumViewer,
} from 'cesium';
import React from 'react';
import { CesiumComponentRef, Clock } from 'resium';
import { useAppDispatch } from '../app/hooks';
import { updateActiveBalloonPos } from '../features/balloon/reduxSlice/balloonSlice';

type Props = {
  mapRef: React.RefObject<CesiumComponentRef<CesiumViewer>>;
  start: JulianDate;
  stop: JulianDate;
};

const CesiumClock: React.FC<Props> = ({ mapRef, start, stop }) => {
  const dispatch = useAppDispatch();

  function toDegrees(cartesian3Pos: Cartesian3) {
    if (cartesian3Pos) {
      let pos = Cartographic.fromCartesian(cartesian3Pos);

      return {
        longitude: (pos.longitude / Math.PI) * 180,
        latitude: (pos.latitude / Math.PI) * 180,
        altitude: pos.height,
      };
    }
  }

  const updateActiveBaloonPosition = () => {
    const { dayNumber, secondsOfDay } = mapRef.current?.cesiumElement?.clock
      .currentTime as JulianDate;

    const entity = mapRef.current?.cesiumElement?.selectedEntity;
    if (entity) {
      const position = toDegrees(
        entity.position!.getValue(new JulianDate(dayNumber, secondsOfDay))
      );
      dispatch(updateActiveBalloonPos(position!));
    }
  };
  return (
    <Clock
      startTime={start.clone()}
      stopTime={stop.clone()}
      currentTime={start.clone()}
      multiplier={1}
      shouldAnimate={true}
      clockRange={ClockRange.LOOP_STOP}
      onTick={updateActiveBaloonPosition}
    />
  );
};

export default CesiumClock;
