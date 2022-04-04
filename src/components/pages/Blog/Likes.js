import React                          from 'react'
import { ReactComponent as LikeIcon } from 'assets/icons/icon-heart.svg'
import { useDispatch }                from 'react-redux'
import { toggleLiked }                from 'data/store/postsSlice'
import { UserContext }                from 'contexts/UserContext'

import 'css/components/blog/blog-likes.scss'

const Likes = ( { id, likes, isLiked } ) => {
    const dispatch = useDispatch()

    const likeUnlike = () => {
        dispatch( toggleLiked( { id, isLiked: !isLiked } ) )
    }

    return (
        <div className="blog-post__likes">
            <UserContext.Consumer>
                { ( { loginStatus } ) => (
                    <>
                        { loginStatus ? <input type="button" className="button button--black-outline" value={ !isLiked ? 'Like' : 'Unlike' } onClick={ likeUnlike } /> : null }
                        {
                            likes ? ( <>
                                <LikeIcon className={ loginStatus && isLiked ? 'bp-liked' : null } />
                                <span>{ likes } { likes > 1 ? 'Likes' : "Like" }</span>
                            </> ) : null
                        }
                    </>
                ) }
            </UserContext.Consumer>
        </div>
    )
}

export default Likes