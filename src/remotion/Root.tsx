import React from 'react';
import { Composition } from 'remotion';
import { getAllTemplates } from '../templates/registry';
import '../templates'; // 触发所有模板注册
import '../index.css';

/**
 * RemotionRoot — 从模板注册中心动态注册所有 Composition
 */
export const RemotionRoot: React.FC = () => {
  const templates = getAllTemplates();

  return (
    <>
      {templates.map((t) => (
        <Composition
          key={t.id}
          id={t.id}
          component={t.component}
          schema={t.schema}
          defaultProps={t.defaultProps}
          width={t.composition.width}
          height={t.composition.height}
          fps={t.composition.fps}
          durationInFrames={t.composition.durationInFrames}
        />
      ))}
    </>
  );
};
