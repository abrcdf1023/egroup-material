import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, boolean } from '@storybook/addon-knobs';

import useGetVideoSnapshot from '@e-group/material-lab/MediaStreamClipper/useGetVideoSnapshot';
import MediaStreamClipper from '@e-group/material-lab/MediaStreamClipper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

storiesOf('MediaStreamClipper', module)
  .add('default', () => {
    const Demo = () => {
      const [countTimeout, setCountTimeout] = React.useState(0)
      const [facingMode, setFacingMode] = React.useState('user')
      const [blob, setBlob] = React.useState()
      const [isStop, setIsStop] = React.useState(false)

      const handleGetIntervalShot = (blob, canvas, ctx) => {
        setBlob(URL.createObjectURL(blob))
        // Can get imageData by canvas and ctx
        // ctx.getImageData(0, 0, canvas.width, canvas.height).data
      };

      const handleClick = () => {
        setFacingMode(val =>
          val === 'user' ? 'environment' : 'user'
        )
      }

      const handleToggle = () => {
        setIsStop(v => !v)
      }

      const handleUserMediaFulfilled = React.useCallback((video) => {
        video.onloadedmetadata = function(e) {
          video.play();
        };
      }, [])
      const handleUserMediaRejected = React.useCallback((reason) => {
        console.log(reason)
      }, [])
      const handleGetUserMediaError = React.useCallback((error) => {
        console.log(error)
      }, [])

      return (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">Streaming</Typography>
            <MediaStreamClipper
              facingMode={facingMode}
              handleGetIntervalShot={handleGetIntervalShot}
              muted
              isStop={isStop}
              timeout={number('timeout', 30000)}
              onTimeout={() => {
                setCountTimeout(v => v + 1)
              }}
              controls
              autoPlay
              mirrored={boolean('mirrored', true)}
              intervalTime={number('intervalTime', 200)}
              onGetUserMediaFulfilled={handleUserMediaFulfilled}
              onGetUserMediaRejected={handleUserMediaRejected}
              onGetUserMediaError={handleGetUserMediaError}
            />
            <br />
            <button onClick={handleClick}>Change facingMode</button>
            <button onClick={handleToggle}>{isStop ? "Continue" : "Stop"}</button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Snapshots</Typography>
            <img src={blob} alt=""/>
          </Grid>
          <Grid item xs={12}>
            count timeout: {countTimeout}
          </Grid>
        </Grid>
      )
    }
    return (
      <Demo />
    )
  })
  .add('useGetVideoSnapshot',
  () => {
    const Demo = () => {
      const videoEl = React.useRef(null);
      const [getVideoSnapshot] = useGetVideoSnapshot(videoEl);
      const [blob, setBlob] = React.useState()

      const handleClick = async () => {
        const blob = await getVideoSnapshot('image/jpeg', 0.8);
        setBlob(URL.createObjectURL(blob))
      };

      return (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Video</Typography>
            <video ref={videoEl} src='/video.mp4' autoPlay controls/>
            <br />
            <Button variant="contained" onClick={handleClick}>Snapshot</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Snapshots</Typography>
            <img src={blob} alt=""/>
          </Grid>
        </Grid>
      )
    }
    return (
      <Demo />
    )
  }
);
