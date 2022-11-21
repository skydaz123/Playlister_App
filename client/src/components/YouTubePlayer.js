import React from 'react'
import YouTube from 'react-youtube';

const YouTubePlayer = () => {
    let playlist = [
        "mqmxkGjow1A",
        "8RbXIMZmVv8",
        "8UbNbor3OqQ"
    ];
    
    let currentSong = 0;
    
    // LOAD PLAYLIST AFTER

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        }
    }


    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    function nextSong(){
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event){
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }


    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            nextSong();
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
        return <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />;
    }
}

export default YouTubePlayer;