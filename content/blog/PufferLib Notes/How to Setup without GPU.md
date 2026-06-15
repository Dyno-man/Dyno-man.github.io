> Run all of these commands in your shell environment, this guide is designed for Linux setups

## 1 Clone PufferTank

```bash
git clone https://github.com/PufferAI/PufferTank.git
cd PufferTank
```

## 2 Create the Environment

```bash
uv venv
source venv/bin/activate
uv pip install -e .
```

## 3 Test the docker image

```bash
./docker.sh test
```

This does an initial build of the docker image for you and tests to see if you have all the requirements. If you are building this image without a GPU skip to [3.1 What to do without a GPU] . 

### 3.1 What to do without a GPU
If you do not have a GPU you will run into issues trying to spawn the container.  Paste this code block into the [[docker.sh]] file

```shell
test() {
    local container_id
    local -a run_args exec_args

    container_id=$(docker ps -aq -f "name=^/${name}$")
    if [ -n "$container_id" ] && ! docker start "$name" >/dev/null; then
        echo "The existing ${name} container cannot start. Recreating it..."
        docker rm "$name" >/dev/null || exit 1
        container_id=""
    fi

    if [ -z "$container_id" ]; then
        run_args=(
            --detach
            --interactive
            --name "$name"
            --ipc host
            --cgroupns=host
            -v /var/run/docker.sock:/var/run/docker.sock
            -v "$(pwd):/puffertank/docker"
            --network host
        )

        if docker info --format '{{json .Runtimes}}' | grep -q '"nvidia"'; then
            run_args+=(
                --gpus all
                -e NVIDIA_VISIBLE_DEVICES=all
                -e NVIDIA_DRIVER_CAPABILITIES=all
            )
        else
            echo "NVIDIA Docker runtime not found; starting without GPU access."
        fi

        if [ -n "${DISPLAY:-}" ] && [ -d /tmp/.X11-unix ]; then
            command -v xhost >/dev/null && xhost +local:docker >/dev/null
            run_args+=(
                -v /tmp/.X11-unix:/tmp/.X11-unix
                -e "DISPLAY=$DISPLAY"
            )
            if [ -f "${HOME}/.Xauthority" ]; then
                run_args+=(
                    -v "${HOME}/.Xauthority:/root/.Xauthority"
                    -e XAUTHORITY=/root/.Xauthority
                )
            fi
        fi

        if [ -d /mnt/wslg ]; then
            run_args+=(
                -v /mnt/wslg:/mnt/wslg
                -e WAYLAND_DISPLAY
                -e XDG_RUNTIME_DIR
                -e PULSE_SERVER
            )
        fi

        echo "Running Docker image ${username}/${image}:${tag}..."
        docker run "${run_args[@]}" "${username}/${image}:${tag}" bash >/dev/null || exit 1
    fi

    exec_args=()
    if [ -t 0 ] && [ -t 1 ]; then
        exec_args=(-it)
    fi
    docker exec "${exec_args[@]}" "$name" bash
}
```

## 4 Testing the Docker Image
Now that (hopefully) your docker image is working, you can test the environments out by running 

```bash
./build.sh breakoout --cpu
```

Feel free to replace breakout with whatever environment name you want, this is just the default one in the docs. 


## 5 Run the Training on CPU
To run the pufferlib training run

```bash
puffer train breakout --slowly --vec.num-threads 4
```

Again feel free to replace breakout with whatever environment you are using and increase/decrease the number of threads depending on how good your CPU is. This is up to the users discretion, but the --slowly flag is a must. That is how pufferlib knows to use your CPU instead of looking for a GPU and failing. 

Also when training if the TUI steps stay at 0 you should lower the number of threads that you are using. 
