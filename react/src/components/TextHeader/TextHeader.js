import React, { Component } from 'react'
import styled from 'styled-components'
import { COLORS } from 'config/constants'

const StyledTextHeader = styled.h3`
  color: ${({ color }) => color || TextHeader.COLORS.DARK};
  font-size: ${props =>
    props.fontSize ? `${props.fontSize}rem` : `${props.fontSize}rem`}};
  font-weight: ${props => {
    return props.weight ? props.weight : props.uppercase ? 700 : 400
  }};
  margin-bottom: ${props => `${props.marginBottom}em`};
  letter-spacing: ${props => (props.uppercase ? '0.15em' : '')};
  line-height: ${props => props.lineHeight};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`

class TextHeader extends Component {
  static TYPES = {
    XSMALL: {
      tag: 'h6',
      fontSize: '0.75',
      lineHeight: '1.6',
      marginBottom: '1',
    },
    SMALL: {
      tag: 'h5',
      fontSize: '1.1',
      lineHeight: '1.6',
      marginBottom: '1',
    },
    MEDIUM: {
      tag: 'h4',
      fontSize: '1.4',
      lineHeight: '1.6',
      marginBottom: '1',
    },
    LARGE: {
      tag: 'h3',
      fontSize: '1.8',
      lineHeight: '1.5',
      marginBottom: '0.5',
    },
    XLARGE: {
      tag: 'h2',
      fontSize: '2.4',
      lineHeight: '1.5',
      marginBottom: '0.25',
    },
    JUMBO: {
      tag: 'h1',
      fontSize: '3.6',
      lineHeight: '1.3',
      marginBottom: '0.25',
    },
  }

  static WEIGHTS = {
    THIN: 100,
    LIGHT: 300,
    NORMAL: 400,
    HEAVY: 600,
  }

  static COLORS = {
    WHITE: '#ffffff',
    LIGHT: COLORS.LIGHTGRAY,
    MEDIUM: COLORS.MEDIUMGRAY,
    DARK: COLORS.DARKGRAY,
    PRIMARY: COLORS.PRIMARY,
  }

  render() {
    const { children, customTag, type, ...rest } = this.props

    return (
      <StyledTextHeader as={customTag || type.tag} {...type} {...rest}>
        {children}
      </StyledTextHeader>
    )
  }
}

// TextHeader.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
//   type: PropTypes.oneOf(
//     Object.entries(TextHeader.TYPES).map(([key, value]) => value)
//   ),
//   weight: PropTypes.string,
//   color: PropTypes.string,
//   customTag: PropTypes.string,
//   className: PropTypes.string,
//   style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
// }

export default TextHeader
