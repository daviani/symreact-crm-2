import React from 'react'

const Select = ( {name, value, error = '', label, onChange, children} ) => {
    return (
        <div className='form-group col-6 mt-3'>
            <label htmlFor={ name }>{ label }</label>
            <select value={ value }
                    onChange={ onChange }
                    name={ name }
                    className={ 'form-control' + (error && 'is-invalid') }
                    id={ name }>

                { children }
            </select>
            <p className='invalid-feedback'>{ error }</p>
        </div>
    )
}

export default Select