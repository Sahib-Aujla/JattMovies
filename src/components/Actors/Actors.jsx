import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList } from '../index';

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const page = 1;
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  console.log({ movies });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">Go Back</Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>{new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justify">{data?.biography || 'Sorry, no bio yet...'}</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>Go Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography align="center" variant="h2" gutterbottom>Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={10} />}
      </Box>
    </>
  );
};

export default Actors;
