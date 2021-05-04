import React, { Component } from 'react'
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import YTSearch from  'youtube-api-search';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';

import theme from './theme';
import AppBar from  './TopAppbar';
import VideoList from './VideoList';
import VideoViewer from "./VideoViewer";

const API_KEY = 'AIzaSyC0hbDzKSA6HbIbykJk73cW-LfE8-w8xCs'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('ReactJS')
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    })
  }

  render() {

    const {classes} = this.props;

    const { videos, selectedVideo } = this.state;

    const videoSearch = _.debounce(term => { this.videoSearch(term)}, 300)

    console.log(videos);
    return (
      <ThemeProvider theme={theme}>
        <AppBar setTerm={videoSearch} />
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <VideoViewer video={selectedVideo} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <VideoList
                videos={videos}
                onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
              />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: '100%',
    margin: 0,
    overflowX: 'hidden',
    overflowY: 'hidden',
    // height: '100vh',
    overflowX: 'hidden'
  },
});
export default withStyles(styles)(App);
