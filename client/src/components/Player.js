import React from "react";
import YouTube from "react-youtube";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { useRef, useState, useEffect } from "react";
export default function YouTubePlayerExample(props) {
  // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
  // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
  // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
  // FROM ONE SONG TO THE NEXT

  // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
  const playerRef = useRef(null);
  const { selectedList } = props;

  let playlist = null;
  if (selectedList !== null) {
    playlist = selectedList.songs;
  }
  // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
  let currentSong = 0;

  const playerOptions = {
    height: "250",
    width: "590",
    playerVars: {
      autoplay: 0,
    },
  };

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlayCurrentSong(player) {
    let song = playlist[currentSong];
    player.loadVideoById(song.youTubeId);
    let songNumber = document.getElementById("player-song-number");
    let songTitle = document.getElementById("player-song-title");
    let songArtist = document.getElementById("player-song-artist");
    songNumber.innerHTML = "Song #: " + (parseInt(currentSong)+1); 
    songTitle.innerHTML = "Title: " + playlist[currentSong].title;
    songArtist.innerHTML = "Artist: " + playlist[currentSong].artist;
  }

  function loadFirstSong(player) {
    let song = playlist[currentSong];
    player.cueVideoById(song.youTubeid);
    let songNumber = document.getElementById("player-song-number");
    let songTitle = document.getElementById("player-song-title");
    let songArtist = document.getElementById("player-song-artist");
    songNumber.innerHTML = "Song #: " + (parseInt(currentSong)+1); 
    songTitle.innerHTML = "Title: " + playlist[currentSong].title;
    songArtist.innerHTML = "Artist: " + playlist[currentSong].artist;
  }
  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    currentSong++;
    currentSong = currentSong % playlist.length;
  }

  function onPlayerReady(event) {
    loadFirstSong(event.target);
    playerRef.current = event.target;
  }

  const handleSkip = () => {
    incSong();
    loadAndPlayCurrentSong(playerRef.current);
  };

  const handlePrevious = () => {
    if (currentSong !== 0) {
      currentSong--;
      loadAndPlayCurrentSong(playerRef.current);
    }
  };

  const handlePlay = () => {
    if (playerRef.current.getPlayerState() !== 1) {
      playerRef.current.mute();
      playerRef.current.playVideo();
      playerRef.current.unMute();
    }
  };

  const handlePause = () => {
    if (playerRef.current.getPlayerState() !== 2) {
      playerRef.current.pauseVideo();
    }
  };

  // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
  // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
  // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
  // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }

  if (playlist === null) {
    return <div>NO PLAYLIST DETECTED</div>;
  } else if (playlist.length === 0) {
    return <div>THIS PLAYLIST HAS NO SONGS</div>;
  } else {
    return (
      <Grid container>
        <Grid item>
          <YouTube
            videoId={playlist[currentSong].youTubeId}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
        </Grid>
        <Grid item md="12">
          <Box
            sx={{
              backgroundColor: "darkgray",
              width: "100%",
              height: 150,
              borderRadius: 3,
            }}
          >
            <Grid container>
              <Grid item md="12">
                <Typography sx={{ textAlign: "center" }}>
                  Now Playing
                </Typography>
              </Grid>
              <Grid item md="12">
                Playlist: {selectedList.name}
              </Grid>
              <Grid item md="12">
                <div id="player-song-number"></div>
              </Grid>
              <Grid item md="12">
                <div id="player-song-title"></div>
              </Grid>
              <Grid item md="12">
                <div id="player-song-artist"></div>
              </Grid>
              <Grid item md="12">
                <Box
                  sx={{
                    backgroundColor: "white",
                    width: "90%",
                    height: 50,
                    marginLeft: 3.5,
                    borderRadius: 4,
                    top: 5,
                    border: "0.5px solid white",
                  }}
                >
                  <IconButton sx={{ marginLeft: 18 }} onClick={handlePrevious}>
                    <FastRewindIcon sx={{ fontSize: 50, color: "black" }} />
                  </IconButton>
                  <IconButton onClick={handlePause}>
                    <StopIcon sx={{ fontSize: 50, color: "black" }} />
                  </IconButton>
                  <IconButton onClick={handlePlay}>
                    <PlayArrowIcon sx={{ fontSize: 50, color: "black" }} />
                  </IconButton>
                  <IconButton onClick={handleSkip}>
                    <FastForwardIcon sx={{ fontSize: 50, color: "black" }} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

/*import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';*/
