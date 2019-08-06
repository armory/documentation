import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const ButtonGroup = ({ vertical, block, fit, center, children }) => {
  const _className = classnames('ButtonGroup', {
    'ButtonGroup--block': block,
    'ButtonGroup--vertical': vertical,
    'ButtonGroup--horizontal': !vertical,
    'ButtonGroup--fit': fit,
    'ButtonGroup--align-center': center,
  })

  return <div className={_className}>{children}</div>
}

ButtonGroup.propTypes = {
  vertical: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
}

export default ButtonGroup
