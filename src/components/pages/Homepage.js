import React    from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as LogoIcon } from 'assets/logo-icon.svg'
import 'css/pages/homepage.scss'

const Homepage = () => {
    return (
        <div className="homepage__welcome">
            <div className="homepage__welcome-image">
                <div className="tb">
                    <LogoIcon />
                </div>
                <div className="tc" />
            </div>

            <h1>Welcome to Mark's home assignment!</h1>

            <ul>
                <li>I would probably never build a website entirely React-based, due to performance and SEO concerns.</li>
                <li>If I would decide to do that, a better way might be a framework like NextJS that I'm looking at recently.</li>
            </ul>

            <Link to="blog" className="button button--size-m button--black button--arrow-right">Go to blog</Link>
        </div>
    )
}

export default Homepage