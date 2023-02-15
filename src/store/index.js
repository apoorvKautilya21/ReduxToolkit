import { configureStore, createSlice, createAction } from "@reduxjs/toolkit";

export const reset = createAction("app/reset");

// console.log(reset.toString());   /// app/reset

const moviesSlice = createSlice({
  name: "movie",
  initialState: [],
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
    },
    removeMovie(state, action) {
      state.splice(state.indexOf(action.payload), 1);
    }
    // reset(state, action) {
    //   return [];
    // }
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return [];
    });
  }
});

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      // here state = []; only manages the state of songs
      // here we can't access state of movies using this state
      // state = ['baby', 'shape of you'];
      state.push(action.payload);
    },
    removeSong(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    }
  },
  extraReducers(builder) {
    // builder.addCase("movie/reset", (state, action) => {
    //   return [];
    // });
    // OR we can write like this as
    // "movie/reset" === moviesSlice.actions.reset().type
    // and "movie/reset" === moviesSlice.actions.reset.toString()
    // builder.addCase(moviesSlice.actions.reset, (state, action) => {
    //   return [];
    // });

    ///// using app/reset
    builder.addCase(reset, (state, action) => {
      return [];
    });
  }
});

const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
    movies: moviesSlice.reducer
  }
});

/*

state:
{
  movies: ['Endgame', 'Harry Potter', 'Fantastic Beasts'],  // state managed by moviesSlice
  songs: ['baby', 'shape of you'],  // state managed by songsSlice;
}

*/

/*
/////////
console.log(songsSlice.actions); // returns an object containing functions
// with the same name as the reducers of sonsSlice that are addSong and removeSong
// these function are different from those reducer functions. they returns
// the action object like {type:'song/addSong', payload: 'New Song!!'} when we 
// call them like songsSlice.actions.addSong('New Song!!');
console.log(songsSlice.actions.addSong('New Song'))
// {type: "song/addSong", payload: "New Song"}
///////

const currentState = store.getState();
console.log(JSON.stringify(currentState)); // {"songs":[]}

// store.dispatch({
//   type: "song/addSong",
//   payload: "New Song!!!"
// });

store.dispatch(songsSlice.actions.addSong("New Song!!"));

const finalState = store.getState();
console.log(JSON.stringify(finalState)); // {"songs":["New Song!!"]}
*/

export { store };
export const { addSong, removeSong } = songsSlice.actions;
export const { addMovie, removeMovie } = moviesSlice.actions;
