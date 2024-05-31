import React from 'react';

export function ExposedFragment(props: { children: React.ReactNode }) {
  return <React.Fragment>{props.children}</React.Fragment>;
}
