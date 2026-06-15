## Check if Display is Available in Docker
If you are just now experiencing the trouble of not getting the visualization inside of docker try this command inside of the docker image to see if the image has access to your display

```bash
echo $DISPLAY
ls /tmp/.X11-unix
```

If anything shows up besides an error message your good to go, or you might be experiencing a different bug

## Enable Xhost
If you followed the above command and got the error here is what you need to do.

Go outside of your docker image and run
```bash
xhost +local:docker
```

This should give your docker containers access to your monitor, which should allow you to be able to visualize your training.
