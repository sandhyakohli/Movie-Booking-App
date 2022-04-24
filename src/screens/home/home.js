import React, { Component } from "react";
import "./home.css";
import Header from "../../common/Header/Header";
import { withStyles } from "@material-ui/core/styles";
import moviesData from "../../common/moviesData";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import genres from "../../common/genre";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import artists from "../../common/artists";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';
import Details from "../Details/details";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  upcomingMoviesHeading: {
    textAlign: "center",
    background: "#ff9999",
    padding: "8px",
    fontSize: "1rem",
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movieName: "",
      genres: [],
      artists: [],
      release_date: "",
    };
  }

  movieNameChangeHandler = (event) => {
    this.setState({ movieName: event.target.value });
  };
  genreSelectHandler = (event) => {
    this.setState({ genres: event.target.value });
  };
  artistSelectHandler = (event) => {
    this.setState({ artists: event.target.value });
  };
  releaseDateSelectHandler = (event) => {
    this.setState({ release_date: event.target.value });
  };

  movieClickHandler = (movieId) => {
    ReactDOM.render(<Details movieId={movieId} />, document.getElementById('root'));
}


  render() {
    const { classes } = this.props;
    var data = null;

    data = moviesData.filter((moviesData) => {
      function filterGenres(genres) {
        
        let bool = false;
        for (let x in genres) {
          for (let y in moviesData.genres) {
            if (genres[x] === moviesData.genres[y]) {
              bool = true;
            }
          }
        }
        return bool;
      }

      function filterArtists(artists) {
        
        let bool = false;
        for (let x in artists) {
          for (let y in moviesData.artists) {
            if (
              artists[x] ===
              moviesData.artists[y].first_name +
                " " +
                moviesData.artists[y].last_name
            ) {
              bool = true;
            }
          }
        }
        return bool;
      }

      function filterReleaseDate(date) {
        let count = 0;
        let dateSet = date.split("-");
        let moviedate = [
          moviesData.release_date.substr(0, 4),
          moviesData.release_date.substr(5, 2),
          moviesData.release_date.substr(8, 2),
        ];
       
        for (let x in dateSet) {
          if (dateSet[x] === moviedate[x]) {
            count++;
          }
        }
        if (count === 3) {
          return true;
        } else {
          return false;
        }
      }
      return (
        (this.state.movieName === "" ||
          moviesData.title === this.state.movieName) &&
        (this.state.genres.length === 0 || filterGenres(this.state.genres)) &&
        (this.state.artists.length === 0 ||
          filterArtists(this.state.artists)) &&
        (this.state.release_date.length === 0 ||
          filterReleaseDate(this.state.release_date))
      );
    });
    return (
      <div>
        {/* <Header /> */}
        <div className={classes.upcomingMoviesHeading}>
          <span>Upcoming Movies</span>
        </div>
        <GridList cols={6} className={classes.gridListUpcomingMovies}>
          {data.map((data) => (
            <GridListTile key={data.id}>
              <img
                src={data.poster_url}
                className="movie-poster"
                alt={data.title}
              />
              <GridListTileBar title={data.title} />
            </GridListTile>
          ))}
        </GridList>

        <div className="flex-container">
          <div className="left">
            <GridList
              cellHeight={350}
              cols={4}
              className={classes.gridListMain}
            >
              {data.map((data) => (
                 <GridListTile onClick={() => this.movieClickHandler(data.id)} className="released-movie-grid-item" key={"grid" + data.id}>
                  <img
                    src={data.poster_url}
                    className="movie-poster"
                    alt={data.title}
                  />
                  <GridListTileBar
                    title={data.title}
                    subtitle={
                      <span>
                        Release Date:{" "}
                        {new Date(data.release_date).toDateString()}
                      </span>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="right">
            <Card>
              <CardContent>
                <FormControl className={classes.formControl}>
                  <Typography className={classes.title} color="textSecondary">
                    FIND MOVIES BY:
                  </Typography>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input
                    id="movieName"
                    onChange={this.movieNameChangeHandler}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox">
                    Genres
                  </InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox-genre" />}
                    renderValue={(selected) => selected.join(",")}
                    value={this.state.genres}
                    onChange={this.genreSelectHandler}
                  >
                    <MenuItem value="0">None</MenuItem>
                    {genres.map((genre) => (
                      <MenuItem key={genre.id} value={genre.name}>
                        <Checkbox
                          checked={this.state.genres.indexOf(genre.name) > -1}
                        />
                        <ListItemText primary={genre.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox">
                    Artists
                  </InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={(selected) => selected.join(",")}
                    value={this.state.artists}
                    onChange={this.artistSelectHandler}
                  >
                    <MenuItem value="0">None</MenuItem>
                    {artists.map((artist) => (
                      <MenuItem
                        key={artist.id}
                        value={artist.first_name + " " + artist.last_name}
                      >
                        <Checkbox
                          checked={
                            this.state.artists.indexOf(
                              artist.first_name + " " + artist.last_name
                            ) > -1
                          }
                        />
                        <ListItemText
                          primary={artist.first_name + " " + artist.last_name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateStart"
                    label="Release Date Start"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    onChange={this.releaseDateSelectHandler}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateEnd"
                    label="Release Date End"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl className={classes.formControl}>
                  <Button variant="contained" color="primary">
                    APPLY
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
