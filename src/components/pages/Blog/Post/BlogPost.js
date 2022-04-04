import React               from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector }     from 'react-redux'

import Likes from '../Likes'

import 'css/components/blog/blog-post.scss'

const BlogPost = ( data ) => {
    const posts = useSelector( ( state ) => state.posts )

    const fetchDataByID = ( id ) => {
        return posts.find( post => {
            return post.id === parseInt( id )
        } )
    }

    // check whether in a single post view or inside a grid
    // if single - fetch data first then load the template
    const params = useParams()
    data = params.id ? fetchDataByID( params.id ) : data.data

    return <BlogPostTemplate data={ data } isSingle={ params.id } />
}

function BlogPostTemplate( props ) {
    const isSingle = props.isSingle
    const { id, title, excerpt, likes, img } = props.data

    const isLiked      = props.data.isLiked ?? false
    const link         = `/blog/p${ id }`
    const imageElement = <div><img src={ `../data/img/${ img }` } alt={ title } /></div>
    const imageClass   = 'blog-post__thumb'

    let wrapperClasses = [ 'blog-post' ]
    if( isSingle )
        wrapperClasses.push( 'blog-post--single' )

    return (
        <div className={ wrapperClasses.join( ' ' ) }>
            {
                // Generate a link only if not is single
                !isSingle
                    ? <Link to={ link } className={ imageClass }>{ imageElement }</Link>
                    : <div className={ imageClass }>{ imageElement }</div>
            }

            {
                // Generate a link only if not is single
                !isSingle
                    ? <Link to={ link }><h3>{ title }</h3></Link>
                    : <h1>{ title }</h1>
            }

            <p className="blog-post__excerpt">{ excerpt }</p>

            <Likes id={ id } likes={ likes } isLiked={ isLiked } />

            { isSingle && <Link to="/blog" className="blog-post__back-link button button--size-m button--black-outline button--arrow-left">Back to Blog</Link> }
        </div>
    )
}

export default BlogPost