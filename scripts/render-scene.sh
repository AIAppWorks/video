#!/bin/bash
SCENE=${1:-1}

npx remotion render src/index.ts model-names out/Scene${SCENE}.mp4 \
  --muted --overwrite \
  --audio-codec=aac \
  --codec=h264 --crf=23 \
  --image-format=jpeg --jpeg-quality=80 \
  --props="{\"scene\":${SCENE}}"

npx remotion still src/index.ts model-names out/img/Scene${SCENE}-last.jpg \
  --frame=179 \
  --jpeg-quality=90 \
  --props="{\"scene\":${SCENE}}"
