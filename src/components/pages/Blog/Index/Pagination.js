import React from 'react'
import { Link } from 'react-router-dom'

import 'css/components/blog/pagination.scss'

export default class Pagination extends React.Component {
    constructor( props ) {
        super( props )
        this.onClick = this.onClick.bind( this )
    }

    onClick( e ) {
        e.preventDefault()
        this.props.onPageChange( parseInt( e.target.getAttribute( 'data-page' ) ) )
        window.scrollTo( 0, 0 )
    }

    render() {
        const { currentPage, perPage, postsCount } = this.props
        const totalPages = Math.ceil( postsCount / perPage )

        if( totalPages === 1 )
            return null

        let pageNumbers = []
        for( let i = 1; i <= totalPages; i++ )
            if( i === 1 || i === totalPages || ( i >= ( currentPage - 2 ) && i <= ( currentPage + 2 ) ) )
                pageNumbers.push( i )
            else if( pageNumbers.at( -1 ) !== '...' )
                pageNumbers.push( '...' )

        return (
            <div className="blog-posts__pagination">
                { currentPage > 1 && <Link to={ `/blog/page/${ currentPage - 1 }` } data-page={ currentPage - 1 } onClick={ this.onClick }>Prev</Link> }

                <div className="blog-posts__pagination__page-numbers">
                    {
                        pageNumbers.map( ( page, i ) => (
                            <Link key={ i } to={ `/blog/page/${ page }` } className={ currentPage === page ? 'blog-posts__pagination__page-numbers--current' : '' } data-page={ page === i + 1 ? page : null } onClick={ this.onClick }>{ page }</Link>
                        ) )
                    }
                </div>

                { currentPage < totalPages && <Link to={ `/blog/page/${ currentPage + 1 }` } data-page={ currentPage + 1 } onClick={ this.onClick }>Next</Link> }
            </div>
        )
    }
}