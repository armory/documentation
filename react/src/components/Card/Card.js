import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Card = ({ children, backStyle }) => {
  const _cardClass = classnames('Card', {
    'Card--light': backStyle === 'light',
  })
  return <div className={_cardClass}>{children}</div>
}

Card.propTypes = {
  backStyle: PropTypes.string,
}

export default Card
