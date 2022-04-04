import React, { useEffect }                     from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { UserContext }                          from 'contexts/UserContext'

import Header from 'components/structure/Header'
import Footer from 'components/structure/Footer'

import RouteList from './Routes'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect( () => {
        window.scrollTo( 0, 0 )
    }, [ pathname ] )

    return null
}

class App extends React.Component {
    constructor( props ) {
        super( props )

        this.handleLogin = this.handleLogin.bind( this )

        this.state = {
            isLoggedIn: false
        }
    }

    handleLogin() {
        this.setState( { isLoggedIn: !this.state.isLoggedIn } )
    }

    render() {
        const loggedIn = {
            loginStatus : this.state.isLoggedIn,
            handleLogin : this.handleLogin
        }

        return (
            <UserContext.Provider value={ loggedIn }>
                <Router>
                    <ScrollToTop />
                    <Header />
                    <main>
                        <RouteList />
                    </main>
                    <Footer />
                </Router>
            </UserContext.Provider>
        )
    }
}

export default App