import React from 'react';
import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { Scene1Opening } from './scenes/Scene1Opening';
import { Scene2Opus } from './scenes/Scene2Opus';
import { Scene3Sonnet } from './scenes/Scene3Sonnet';
import { Scene4Haiku } from './scenes/Scene4Haiku';
import { Scene5MythosDetail } from './scenes/Scene5MythosDetail';
import { Scene6Summary } from './scenes/Scene6Summary';
import { Scene7Mythos } from './scenes/Scene7Mythos';

export const ModelNamesPropsSchema = z.object({
  scene: z.number().int().min(1).max(7),

  // Scene 1 - Opening
  s1Question: z.string(),
  s1Subtitle: z.string(),

  // Scene 2 - Opus
  s2ModelName: z.string(),
  s2Origin: z.string(),
  s2Detail1: z.string(),
  s2Detail2: z.string(),
  s2Tagline: z.string(),

  // Scene 3 - Sonnet
  s3ModelName: z.string(),
  s3Origin: z.string(),
  s3Detail1: z.string(),
  s3Detail2: z.string(),
  s3Tagline: z.string(),

  // Scene 4 - Haiku
  s4ModelName: z.string(),
  s4Origin: z.string(),
  s4Detail1: z.string(),
  s4Detail2: z.string(),
  s4Tagline: z.string(),

  // Scene 5 - Mythos Detail
  s5mModelName: z.string(),
  s5mOrigin: z.string(),
  s5mDetail1: z.string(),
  s5mDetail2: z.string(),
  s5mTagline: z.string(),

  // Scene 6 - Summary
  s6Title: z.string(),
  s6OpusLine: z.string(),
  s6SonnetLine: z.string(),
  s6HaikuLine: z.string(),

  // Scene 7 - Mythos Teaser
  s7ModelName: z.string(),
  s7Origin: z.string(),
  s7Tagline: z.string(),

  // Style
  bgColor: z.string(),
  opusColor: z.string(),
  sonnetColor: z.string(),
  haikuColor: z.string(),
  mythosColor: z.string(),
  textColor: z.string(),
  subtextColor: z.string(),
});

export type ModelNamesProps = z.infer<typeof ModelNamesPropsSchema>;

const FONT_STACK = 'system-ui, -apple-system, "PingFang SC", "Hiragino Sans GB", sans-serif';

const SCENE_MAP: Record<number, React.FC<ModelNamesProps>> = {
  1: Scene1Opening,
  2: Scene2Opus,
  3: Scene3Sonnet,
  4: Scene4Haiku,
  5: Scene5MythosDetail,
  6: Scene6Summary,
  7: Scene7Mythos,
};

export const ModelNames: React.FC<ModelNamesProps> = (props) => {
  const SceneComponent = SCENE_MAP[props.scene] || Scene1Opening;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: props.bgColor,
        fontFamily: FONT_STACK,
        overflow: 'hidden',
      }}
    >
      <SceneComponent {...props} />
    </AbsoluteFill>
  );
};
