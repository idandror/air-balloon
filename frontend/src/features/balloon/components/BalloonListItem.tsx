import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { Balloon } from '../interface/balloonInterfaces';

const BalloonListItem: React.FC<{ balloon: Balloon }> = (props) => {
  const { balloon } = props;
  const position = useAppSelector((state) => state.balloons.activePos);

  return (
    <>
      <ListItem component="div" divider>
        <ListItemText primary="Name" sx={{ float: 'left' }} />
        <ListItemText>
          <span style={{ float: 'right' }}>{balloon.name}</span>
        </ListItemText>
      </ListItem>
      <ListItem component="div" divider alignItems="flex-start">
        <ListItemText primary="Description" sx={{ float: 'left' }} />
        <ListItemText>
          <span style={{ float: 'right' }}>
            {balloon.description.length > 20
              ? balloon.description.substring(0, 20) + '..'
              : balloon.description}
          </span>
        </ListItemText>
      </ListItem>
      <ListItem component="div" divider>
        <ListItemText primary="Type" sx={{ float: 'left' }} />
        <ListItemText>
          <span style={{ float: 'right' }}>{balloon.type}</span>
        </ListItemText>
      </ListItem>
      <ListItem component="div" divider>
        <ListItemText primary="Color" sx={{ float: 'left' }} />
        <ListItemText>
          <span style={{ float: 'right' }}>{balloon.color}</span>
        </ListItemText>
      </ListItem>
      <ListItem component="div" divider alignItems="center">
        <ListItemText primary="Position" />
      </ListItem>
      <ListItem component="div" divider>
        <ListItemText primary="Height" sx={{ float: 'left' }} />
        <ListItemText>
          <span style={{ float: 'right' }}>
            {position ? position.altitude.toFixed(4) : balloon.altitude}
          </span>
        </ListItemText>
      </ListItem>
      <ListItem component="div" divider>
        <ListItemText primary="Longitude" sx={{ float: 'left' }} />
        <ListItemText>
          <span style={{ float: 'right' }}>
            {position ? position.longitude.toFixed(4) : balloon.longitude}
          </span>
        </ListItemText>
      </ListItem>
      <ListItem component="div" divider>
        <ListItemText primary="Latitude" sx={{ float: 'left' }} />
        <ListItemText>
          <span style={{ float: 'right' }}>
            {position ? position.latitude.toFixed(4) : balloon.latitude}
          </span>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default BalloonListItem;
