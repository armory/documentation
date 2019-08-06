import React from 'react'
import styled from 'styled-components'

import { COLORS } from 'config/constants'

const StyledButton = styled.button`
  background-color: ${props => props.backgroundcolor || COLORS.PRIMARY};
  border: none;
  border-radius: ${props => (props.rounded ? '100px' : '4px')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  color: ${props => props.textcolor || '#ffffff'};
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.875rem 1.25rem;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transform: translateY(0);
  transition: all 0.25s linear;
  white-space: nowrap;

  &a {
    display: inline-block;
  }

  :after {
    display: none;
  }

  &:hover {
    background: darken(#00d494, 1%);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25);

    cursor: pointer;
    transform: translateY(-2px);
  }

  &:active {
    background: darken(#00d494, 3%);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    color: #eeeeee;
    transition: none;
    transform: translateY(1px);
  }

  &:hover,
  &:active {
    color: ${({ textcolor }) => textcolor || '#ffffff'};
    text-decoration: none;
  }

  & + & {
    margin-left: 1.5rem;
  }
`

const Button = ({
  children,
  onClick,
  to,
  external = false,
  newTab = false,
  noNewTab,
  rounded,
  color,
}) => {
  return (
    <StyledButton
      as="a"
      href={to}
      target={noNewTab ? undefined : '_blank'}
      rounded={rounded || undefined}
      textcolor={color.text || undefined}
      backgroundcolor={color.background || undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </StyledButton>
  )
}

Button.COLORS = {
  PRIMARY: {
    background: COLORS.PRIMARY,
    text: '#ffffff',
  },
  SECONDARY: {
    background: COLORS.SECONDARY,
    text: '#ffffff',
  },
  LIGHT: {
    background: '#FFFFFF',
    text: '#00d494',
  },
}

Button.SIZES = {
  SMALL: 'Button--small',
  MEDIUM: 'Button--medium',
  LARGE: 'Button--large',
}

Button.defaultProps = {
  color: Button.COLORS.PRIMARY,
}

export default Button
