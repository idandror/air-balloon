import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  createEditBalloon,
  getBalloons,
} from '../reduxSlice/balloonSlice';
import { useApolloClient } from '@apollo/client';
import { APOLLO_GRAPHQL } from '../../../utils/constants';
import balloonReducer from '../reduxSlice/balloonReducer';
import { getBalloonsGraphql } from '../api/getBalloons/getBalloonsGraphql';
import { getBalloonsRest } from '../api/getBalloons/getBalloonsRest';
import { createBalloonRest } from '../api/addEditBalloon/createBalloonRest';
import { createEditBalloonGraphql } from '../api/addEditBalloon/createBalloonGraphql';
import { Balloon } from '../interface/balloonInterfaces';

const PopupForm: React.FC<{ balloon?: Balloon }> = ({ balloon }) => {
  const dispatch = useAppDispatch();
  const client = useApolloClient();
  const { isSuccess, isError } = useAppSelector((state) => state.balloons);
  const balloons = useAppSelector((state) => state.balloons.balloons);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [name, setName] = useState<String>('');
  const [description, setDescription] = useState<String>('');
  const [longitude, setLongitude] = useState<string>('34.8464');
  const [latitude, setLatitude] = useState<string>('32.14115');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (balloon) {
      setName(balloon.name);
      setType(balloon.type);
      setColor(balloon.color);
      setDescription(balloon.description);
      setLongitude(balloon.longitude.toString());
      setLatitude(balloon.latitude.toString());
    } else {
      setName('');
      setType('');
      setColor('');
      setDescription('');
      setLongitude('34.8464');
      setLatitude('32.14115');
    }

    setDisabled(true);
  }, [balloon, isSuccess]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localBalloon: Balloon = {
      name,
      description,
      type,
      color,
      longitude: Number(longitude),
      latitude: Number(latitude),
      altitude: 1300,
    };
    const valid = validate();
    if (valid) {
      localBalloon.id = balloon ? balloon.id : '';
      //const balloonFunc = balloon
      //  ? balloonReducer.editBalloon
      //  : createBalloonRest;
      const result = await dispatch(
        createEditBalloon({
          balloon: localBalloon,
          createEditBalloonGraphql: APOLLO_GRAPHQL
            ? (balloon: Balloon) => createEditBalloonGraphql(client, balloon)
            : createBalloonRest,
        })
      );
      if (createEditBalloon.fulfilled.match(result)) {
        dispatch(
          getBalloons({
            getBalloonsRequest: APOLLO_GRAPHQL
              ? () => getBalloonsGraphql(client)
              : getBalloonsRest,
          })
        );
        handleClose();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'longitude':
        setLongitude(e.target.value);
        break;
      case 'latitude':
        setLatitude(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(e.target.value);
  };

  const handleColorChange = (e: SelectChangeEvent<string>) => {
    setColor(e.target.value);
  };

  const validate = () => {
    let checking;
    if (balloon) {
      checking = checkEditBalloon();
    } else {
      checking = checkCreateNewBalloon();
    }
    if (checking) {
      setErrorMessage('');
      setDisabled(false);
    } else {
      setDisabled(true);
      return false;
    }
    return true;
  };

  const checkEditBalloon = () => {
    const bal = balloon;

    let nameUnique = true;

    balloons?.forEach((balloon) => {
      if (balloon.name === name && bal?.id !== balloon.id) {
        //go on every balloon on the list except for the one we are editing
        nameUnique = false;
      }
    });
    if (name && description && type && color) {
      if (
        bal?.name !== name ||
        bal?.description !== description ||
        bal?.type !== type ||
        bal.color !== color
      ) {
        if (!(name.length < 25 && nameUnique)) {
          setErrorMessage('Name should have max of 25 characters');
          return false;
        }
        if (description.length > 150) {
          setErrorMessage('Description should have max of 150 characters');
          return false;
        }
      }
    }
    return true;
  };

  const checkCreateNewBalloon = () => {
    let nameUnique = true;
    balloons?.forEach((balloon) => {
      if (balloon.name === name) {
        nameUnique = false;
      }
    });
    if (!(name.length < 25 && nameUnique && name)) {
      setErrorMessage('Please enter a valid name');
      return false;
    }
    if (description.length > 150) {
      setErrorMessage('Description should have max of 150 characters');
      return false;
    }
    if (!type) {
      setErrorMessage('Please fill in Type');
      return false;
    }
    if (!color) {
      setErrorMessage('Please fill in Color');
      return false;
    }
    return true;
  };

  return (
    <div>
      {balloon ? (
        <Button
          className="createbutton"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Edit
        </Button>
      ) : (
        <Button
          className="createbutton"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Create New Balloon
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        {balloon ? (
          <DialogTitle>Edit</DialogTitle>
        ) : (
          <DialogTitle>Create</DialogTitle>
        )}
        <DialogContent>
          <DialogContentText>
            Please fill in the information below.
          </DialogContentText>
          <Box component={'form'} onSubmit={handleCreate}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of Balloon"
              type="name"
              fullWidth
              onBlur={validate}
              error={isError?.statusCode === 409}
              helperText={
                isError?.statusCode === 409
                  ? isError.message
                  : 'Please enter Balloon Name'
              }
              value={name}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="description"
              fullWidth
              onBlur={validate}
              value={description}
              onChange={handleChange}
              variant="standard"
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                id="types"
                value={type}
                label="Type"
                fullWidth
                onMouseLeave={validate}
                onBlur={validate}
                onChange={handleTypeChange}
              >
                <MenuItem value={'small'}>Small</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'big'}>Big</MenuItem>
                <MenuItem value={'double'}>Double</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                id="colors"
                value={color}
                label="Color"
                onChange={handleColorChange}
                onBlur={validate}
                onMouseLeave={validate}
              >
                <MenuItem value={'Black'}>Black</MenuItem>
                <MenuItem value={'Red'}>Red</MenuItem>
                <MenuItem value={'Blue'}>Blue</MenuItem>
                <MenuItem value={'White'}>White</MenuItem>
              </Select>
              <div>
                <TextField
                  id="longitude"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Longitude
                      </InputAdornment>
                    ),
                  }}
                  value={longitude}
                  variant="filled"
                  onChange={handleChange}
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                  <FilledInput
                    id="latitude"
                    endAdornment={
                      <InputAdornment position="end">Latitude</InputAdornment>
                    }
                    value={latitude}
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleClose}>Cancel</Button>
              {balloon ? (
                <Button
                  type="submit"
                  disabled={disabled}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={disabled}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              )}
            </Box>
            {isError?.statusCode === 404 && (
              <Typography variant="h5" color={'error'}>
                {'Page Not Found'}
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupForm;
