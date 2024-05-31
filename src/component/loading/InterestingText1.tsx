import React, { CSSProperties } from 'react';

export function InterestingText1({ text = 'loading', textStyle = {} }: { text?: string; textStyle?: CSSProperties }) {
  return (
    <div className="r_component_interesting_text_1">
      <div className="text" style={{ ...textStyle }}>
        {text}
      </div>
      <div className="shadow"></div>
    </div>
  );
}
