import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils';
import { searchMovie, selectGenreOrCategory } from './currentGenreOrCategory';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    alanBtn({
      key: '98b6ef2a8359b60d59b101f31a5f8c192e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find((g) => (g.name.toLowerCase() === genreOrCategory.toLowerCase()));

          if (foundGenre) {
            history.push('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const parsedGenre = genreOrCategory.startWith('top') ? 'top_rated' : genreOrCategory;
            history.push('/');
            dispatch(selectGenreOrCategory(parsedGenre));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          window.location.href = '/';
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
