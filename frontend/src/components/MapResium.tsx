import { Viewer, CesiumComponentRef } from 'resium';
import React, { useRef } from 'react';
import {
  createWorldTerrain,
  Ion,
  JulianDate,
  Viewer as CesiumViewer,
} from 'cesium';

import OneBallon from '../features/balloon/components/OneBallon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import CesiumClock from './CesiumClock';
import { resetBalloon } from '../features/balloon/reduxSlice/balloonSlice';
import { TOTAL_TIME } from '../utils/constants';

const MapResium = () => {
  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNzgzNmI4Ny1mOWE2LTQ4M2UtODQxMS04NjIzYTRlZGIxYzYiLCJpZCI6ODM0NjMsImlhdCI6MTY0NTYwMzQ4OH0.htgY_Rwj3OcHvdBpXDwJdBbKJMjMAuQCSY-kqf_Gkaw';
  const worldTerrain = createWorldTerrain();

  const balloons = useAppSelector((state) => state.balloons.balloons);
  const mapRef = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const dispatch = useAppDispatch();

  const time = new Date();

  const start = JulianDate.fromDate(time);
  const stop = JulianDate.addSeconds(start, TOTAL_TIME, new JulianDate());

  const allBalloons = balloons?.map((balloon) => (
    <OneBallon key={balloon.id} balloon={balloon} start={start} stop={stop} />
  ));
  const handleSelectedChange = () => {
    if (!mapRef.current?.cesiumElement?.selectedEntity)
      dispatch(resetBalloon());
  };

  return (
    <>
      <Viewer
        style={{ height: '700px' }}
        id="resiumviewer"
        terrainProvider={worldTerrain}
        ref={mapRef}
        onSelectedEntityChange={handleSelectedChange}
      >
        <CesiumClock mapRef={mapRef} start={start} stop={stop} />
        {allBalloons}
      </Viewer>
    </>
  );
};

export default MapResium;
