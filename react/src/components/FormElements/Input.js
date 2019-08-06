// import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;

  & + & {
    margin-left: 1rem;
  }
`

const StyledInput = styled.input`
  border-radius: 2px;
  border: 1px solid #ddd;
  padding: 0.5rem 0.5rem;
`
const Label = styled.label`
  display: block;
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 5px;
`

const Input = ({
  label,
  value,
  name,
  field, // { name, value, onChange, onBlur }
  ...props
}) => {
  return (
    <InputWrapper>
      {label && (
        <div>
          <Label>{label}</Label>
        </div>
      )}

      <StyledInput type={Input.TYPES.TEXT} value="" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </InputWrapper>
  )
}

Input.TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
}

export default Input
