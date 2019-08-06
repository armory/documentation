import Responsive from 'react-responsive'
import React from 'react'
import PropTypes from 'prop-types'

import {
  SMALL_BREAK_POINT,
  MEDIUM_BREAK_POINT,
  LARGE_BREAK_POINT,
  EXTRA_LARGE_BREAK_POINT,
} from '../config/constants'

// NOTE: we referenced BS4 for device sizing
// ref: https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints

// Offset used to prevent issue of both responsive queries being met at same screen size
const MEDIA_OFFSET = 0.02

// -- Simple js size helpers --
export const isMobile = screenWidth =>
  (screenWidth || window.innerWidth) < SMALL_BREAK_POINT - MEDIA_OFFSET

// ///////////////////////////////////////
// -- Responsive Wrapper Classes --
// show/hide children based on current window size

// By default, BS uses minWidth, so if up/down not passed, will assume up
// To use, import Screen and select screen type (i.e. Screen.small)

const ResponsiveScreen = ({ breakpoint, up, down, ...rest }) => (
  // defaults to up (if down isn't passed assumes up, still pass up as good measure so it's obvious when invoked)
  <Responsive
    minWidth={!down ? breakpoint : null}
    maxWidth={down ? breakpoint - MEDIA_OFFSET : null}
    {...rest}
  />
)

ResponsiveScreen.propTypes = {
  breakpoint: PropTypes.number.isRequired,
  up: PropTypes.bool,
  down: PropTypes.bool,
}

export const Screen = {
  // Small devices (landscape phones, 576px and up)
  SMALL: props => (
    <ResponsiveScreen {...props} breakpoint={SMALL_BREAK_POINT} />
  ),
  // Medium devices (tablets, 768px and up)
  MEDIUM: props => (
    <ResponsiveScreen {...props} breakpoint={MEDIUM_BREAK_POINT} />
  ),
  // Large devices (desktops, 992px and up)
  LARGE: props => (
    <ResponsiveScreen {...props} breakpoint={LARGE_BREAK_POINT} />
  ),
  // Extra large devices (large desktops, 1200px and up)
  X_LARGE: props => (
    <ResponsiveScreen {...props} breakpoint={EXTRA_LARGE_BREAK_POINT} />
  ),
}
// ///////////////////////////////////////
