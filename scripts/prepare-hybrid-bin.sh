#!/usr/bin/env bash
# 在较旧的 macOS 上，Remotion 自带的 ffmpeg 可能与系统 AVFoundation 不兼容。
# 将 compositor 二进制 + dylib 与系统 ffmpeg/ffprobe 放在同一目录供 --binaries-directory 使用。
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COMPOSITOR="$ROOT/node_modules/@remotion/compositor-darwin-x64"
HYBRID="$ROOT/remotion-hybrid-bin"
FFMPEG="$(command -v ffmpeg)"
FFPROBE="$(command -v ffprobe)"

if [[ ! -x "$COMPOSITOR/remotion" ]]; then
  echo "Run npm install first." >&2
  exit 1
fi

rm -rf "$HYBRID"
mkdir -p "$HYBRID"
cp "$COMPOSITOR/remotion" "$HYBRID/"
cp "$COMPOSITOR"/*.dylib "$HYBRID/"
ln -sf "$(realpath "$FFMPEG")" "$HYBRID/ffmpeg"
ln -sf "$(realpath "$FFPROBE")" "$HYBRID/ffprobe"
echo "OK: $HYBRID"
