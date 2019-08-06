import React, { Fragment } from 'react'
import loadjs from 'loadjs'
import classnames from 'classnames'

import Card from 'components/Card'

class MarketoForm extends React.Component {
  loadMarketo = () => {
    const { formId } = this.props

    loadjs(
      ['https://app-ab31.armory.io/js/forms2/js/forms2.min.js'],
      `marketo:${formId}`
    )

    loadjs.ready(`marketo:${formId}`, () => {
      window.MktoForms2.loadForm(
        'https://app-ab31.armory.io',
        '644-NAF-166',
        formId,
        form => this.loadForm(form)
      )
    })
  }

  componentDidMount() {
    this.loadMarketo()
  }

  componentWillUnmount() {
    loadjs.reset()
  }

  loadForm(form) {
    var formEl = form.getFormElem()[0]

    // remove element styles from root and children (may want to disable this while debugging)
    for (
      var elsWithStyles = document.querySelectorAll(
          '#' + formEl.id + ', #' + formEl.id + ' [style]'
        ),
        i = 0,
        imax = elsWithStyles.length;
      i < imax;
      i++
    ) {
      elsWithStyles[i].removeAttribute('style')
    }

    const stylesheet1 = document.getElementById('mktoForms2BaseStyle')
    if (stylesheet1) stylesheet1.parentNode.removeChild(stylesheet1)

    const stylesheet2 = document.getElementById('mktoForms2ThemeStyle')
    if (stylesheet2) stylesheet2.parentNode.removeChild(stylesheet2)
  }

  render() {
    const { title, formId, showCard, inline = false } = this.props

    const classes = classnames('MarketoForm', {
      'MarketoForm--inline': inline,
    })

    return (
      <div className={classes}>
        {showCard ? (
          <Card backStyle="white">
            {title && <p className="MarketoForm__title">{title}</p>}
            <form id={`mktoForm_${formId}`} />
          </Card>
        ) : (
          <Fragment>
            {title && <p className="MarketoForm__title">{title}</p>}
            <form id={`mktoForm_${formId}`} />
          </Fragment>
        )}
      </div>
    )
  }
}

export default MarketoForm
