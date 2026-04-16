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
ln -sf "$FFMPEG" "$HYBRID/ffmpeg"
ln -sf "$FFPROBE" "$HYBRID/ffprobe"

# Remotion 的音频预处理（create-silent-audio）会绕过 --binaries-directory，
# 直接调用 compositor 目录的 ffmpeg，因此也需要替换。
ln -sf "$FFMPEG" "$COMPOSITOR/ffmpeg"
ln -sf "$FFPROBE" "$COMPOSITOR/ffprobe"

# 尝试复制 Chrome Headless Shell（如果存在）
CHROME_SOURCES=(
  "$ROOT/node_modules/.remotion/chrome-headless-shell"
  "$HOME/.remotion/chrome-headless-shell"
)

for CHROME_SOURCE in "${CHROME_SOURCES[@]}"; do
  if [[ -d "$CHROME_SOURCE" ]]; then
    echo "Found Chrome at: $CHROME_SOURCE"
    cp -r "$CHROME_SOURCE" "$HYBRID/" || true
    echo "Copied Chrome to: $HYBRID/chrome-headless-shell"
    break
  fi
done

echo "OK: $HYBRID"
