import React from 'react'
import styled from 'styled-components'

const StyledSection = styled.div`
  background-color: ${({ color }) => color || 'transparent'};
  margin: ${({ size, color }) => (color ? 0 : `${size * 2}rem 0`)};
  padding: ${({ size, color }) => (color ? `${size}rem 0` : 0)};

  @media screen and (max-width: 992px) {
    margin: 2rem 0;
    padding: 2rem 0;
  }
`

const Section = ({ children, size = Section.SIZES.NORMAL, color, ...rest }) => {
  return (
    <StyledSection size={size} color={color} {...rest}>
      {children}
    </StyledSection>
  )
}

Section.SIZES = {
  SMALL: 2,
  NORMAL: 3,
  LARGE: 5,
}

Section.COLORS = {
  LIGHT: '#FAFAFA',
  NORMAL: '#FFFFFF',
}

export default Section
