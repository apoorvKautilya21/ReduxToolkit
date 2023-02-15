import { createRandomSong } from "../data";
import { addSong, removeSong } from "../store";
import { useDispatch, useSelector } from "react-redux";

function SongPlaylist() {
  const dispatch = useDispatch();
  // To Do:
  // Get list of songs
  const songPlaylist = useSelector((state) => {
    // console.log(state);
    // here state = {songs: [...], movies: [...]};
    // here state is the managing states of songsSlice and moviesSlice
    // but inside songsSlice or moviesSlice they can have access to
    // their own states only
    return state.songs;
  });

  const handleSongAdd = (song) => {
    const action = addSong(song);
    // console.log(action) // {type: "song/addSong", payload: "Since U Been Gone"}
    dispatch(action);
  };
  const handleSongRemove = (song) => {
    dispatch(removeSong(song));
  };

  const renderedSongs = songPlaylist.map((song) => {
    return (
      <li key={song}>
        {song}
        <button
          onClick={() => handleSongRemove(song)}
          className="button is-danger"
        >
          X
        </button>
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header">
        <h3 className="subtitle is-3">Song Playlist</h3>
        <div className="buttons">
          <button
            onClick={() => handleSongAdd(createRandomSong())}
            className="button is-link"
          >
            + Add Song to Playlist
          </button>
        </div>
      </div>
      <ul>{renderedSongs}</ul>
    </div>
  );
}

export default SongPlaylist;
