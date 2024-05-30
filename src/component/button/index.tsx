import React, { ReactNode } from 'react';
import { useAccount } from 'wagmi';

export interface PureButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  variant?: 'link' | 'circle';
  style?: React.CSSProperties;
  className?: string;
  ariaDescribedby?: string;
}

const VariantClassNameMap = {
  link: '',
  circle: 'r_component_pure_button_circle',
};

export function PureButton(props: PureButtonProps) {
  const {
    onClick,
    children,
    style,
    className,
    variant = 'link',
    ariaDescribedby,
    onMouseEnter = () => {},
    onMouseLeave = () => {},
  } = props;

  return (
    <button
      style={style}
      className={`r_component_pure_button ${VariantClassNameMap[variant]} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </button>
  );
}

export function BrowserButton(props: { children: string; type: 'address' | 'tx' }) {
  const { children, type } = props;
  const { chain } = useAccount();

  const href = `${chain?.blockExplorers?.default?.url}/${type}/${children}`;
  return (
    <a className="r_global_a" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function AExternal(props: { children: ReactNode; href?: string }) {
  const { children, href } = props;
  return (
    <a className="r_global_a" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
