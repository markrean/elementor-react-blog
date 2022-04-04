import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import 'css/components/ui/button-group.scss'

export default class ButtonGroup extends React.Component {
    constructor( props ) {
        super( props )

        this.onChange = this.onChange.bind( this )

        this.id    = uuidv4()
        this.state = {
            value: props.defaultValue ?? null
        }
    }

    onChange( e ) {
        let value = e.target.value
        value = !isNaN( +value ) ? parseInt( value ) : value // convert to int if value is a number

        this.setState( { value: value } )
        this.props.onChange( value )
    }

    render() {
        const { label, buttons } = this.props

        return (
            <div className="button-group__wrapper">
                <small>{ label }</small>
                <div className="button-group">
                    {
                        buttons.map( ( button, i ) => {
                            const inputID = `${ this.id }-${ i }`
                            const value   = button.value ?? button.label.toLowerCase()

                            return (
                                <div key={ i } className={ value === this.state.value ? 'button-group__button-wrapper--active' : null }>
                                    <input type      = "radio"
                                           className = "button-group__button"
                                           name      = { this.id }
                                           value     = { value }
                                           id        = { inputID }
                                           checked   = { value === this.state.value }
                                           onChange  = { this.onChange }
                                    />
                                    <label htmlFor={ inputID }>{ button.label ?? '' }</label>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
        )
    }
}