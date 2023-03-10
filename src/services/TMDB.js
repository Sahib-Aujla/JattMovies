import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbKey = process.env.REACT_APP_TMDB_KEY;
// const tmdbKey = 'f0d8d185289a6d531ff4fc4844a95f75';

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbKey}`;
        }

        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbKey}`;
        }
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbKey}`;
        }
        return `movie/popular?api_key=${tmdbKey}&page=${page}`;
      },
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbKey}`,
    }),

    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbKey}`,
    }),

    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbKey}`,
    }),
    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbKey}`,
    }),
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbKey}`,
    }),
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetActorsDetailsQuery, useGetMoviesByActorIdQuery, useGetListQuery } = tmdbApi;

