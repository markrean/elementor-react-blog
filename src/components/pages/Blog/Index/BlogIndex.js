import React, { useState } from 'react'
import { useSelector }     from 'react-redux'

import BlogPost    from '../Post/BlogPost'
import Pagination  from './Pagination'
import ButtonGroup from 'components/ui/ButtonGroup'

import 'css/components/blog/blog.scss'

const BlogIndex = () => {
    const posts = useSelector( ( state ) => state.posts )

    const [ filterCurrentPage , setFilterCurrentPage ] = useState( 1 )
    const [ filterPerPage     , setFilterPerPage     ] = useState( 6 )
    const [ filterSortBy      , setFilterSortBy      ] = useState( 'latest' )

    const onSortChange = ( value ) => {
        setFilterSortBy( value )
        setFilterCurrentPage( 1 )
    }

    const onPerPageChange = ( value ) => {
        setFilterPerPage( value )
    }

    const onPageChange = ( page ) => {
        setFilterCurrentPage( page )
    }

    const filtersToShow = () => {
        return [
            {
                label        : 'Sort by',
                defaultValue : filterSortBy,
                onChange     : onSortChange,
                buttons      : [
                    { label: 'Latest' },
                    { label: 'Popular' }
                ]
            }, {
                label        : 'Per page',
                defaultValue : filterPerPage,
                onChange     : onPerPageChange,
                buttons      : [
                    { value: 6  , label: '6'  },
                    { value: 9  , label: '9'  },
                    { value: 12 , label: '12' }
                ]
            }
        ]
    }

    const postsDataSort = React.useMemo( () => {
        const sortedPosts = Object.values( posts )
        const property    = filterSortBy === 'popular' ? 'likes' : 'date'

        return sortedPosts.sort( ( a, b ) => ( ( a[ property ] < b[ property ] ) ? 1 : ( ( a[ property ] > b[ property ] ) ? -1 : 0 ) ) )
    }, [ filterSortBy ] )

    const postsToShow = () => {
        const firstPostIndex = ( filterCurrentPage - 1 ) * filterPerPage

        return postsDataSort.slice( firstPostIndex, firstPostIndex + filterPerPage )
    }

    return (
        <>
            <div className="blog-posts__filters">
                {
                    filtersToShow().map( ( filter, i ) => {
                        const { label, defaultValue, buttons, onChange } = filter
                        return <ButtonGroup key={ i } label={ label } defaultValue={ defaultValue } buttons={ buttons } onChange={ onChange } />
                    } )
                }
            </div>

            <div className="blog-posts__grid">
                {
                    postsToShow().map( ( post, i ) => {
                        return ( <BlogPost key={ i } data={ post } /> )
                    } )
                }
            </div>

            <Pagination
                currentPage  = { filterCurrentPage }
                perPage      = { filterPerPage }
                postsCount   = { posts.length }
                onPageChange = { onPageChange }
            />
        </>
    )
}

export default BlogIndex