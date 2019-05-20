# YouSync2
An application that allow you to listen music from YouTube

## Installation
You will need last version of node and npm

```bash
# Node
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

# NPM
sudo npm install -g npm
```

Then you will need last version of youtube-dl

```bash
pip install --upgrade youtube-dl
```


Finally you can install both serve and client modules

```bash
npm install
```

## Bug :
Some videos will have m4a codec for audio which is not supported by all browser.
Last firefox version will work for most of youtube music.
