import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { UserContext }                from 'contexts/UserContext'

import { ReactComponent as Logo } from 'assets/logo.svg'
import 'css/structure/header.scss'

const Header = () => {
    return (
        <header>
            <Link to="/" className="header__logo">
                <Logo />
            </Link>
            <Menu />
            <LoginButton />
        </header>
    )
}

const Menu = () => {
    const [ menuOpen , setMenuOpen ] = useState( false )

    const { pathname } = useLocation()

    useEffect( () => {
        setMenuOpen( false )
    }, [ pathname ] )

    const menuItems = [
        {
            label : 'Homepage',
            route : '/'
        }, {
            label : 'Blog',
            route : 'blog'
        }
    ]

    return (
        <>
            <div className={ 'main-menu__trigger' + ( menuOpen ? ' main-menu__trigger--open' : '' ) } onClick={ () => setMenuOpen( !menuOpen ) }><span /></div>
            <nav className="main-menu">
                { menuItems.map( ( item, i ) => (
                    <MenuItem
                        key   = { i }
                        props = { item }
                    />
                ) ) }
            </nav>
        </>
    )
}

const MenuItem = ( props ) => {
    const { label, route } = props.props
    if( !label || !route )
        return null

    const activeClassName = 'main-menu__active'

    return <NavLink to={ route } className={ ( { isActive } ) => isActive ? activeClassName : null }>{ label }</NavLink>
}

const LoginButton = () => {
    return (
        <UserContext.Consumer>
            { ( { loginStatus, handleLogin } ) => {
                return <a href="/" className="header__login-button" onClick={ ( e ) => { e.preventDefault(); handleLogin() } }>{ loginStatus ? 'Logout' : "Login" }</a>
            } }
        </UserContext.Consumer>
    )
}

export default Header