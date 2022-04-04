import { createSlice } from '@reduxjs/toolkit'
import Posts from 'data/posts.json'

export const postsSlice = createSlice( {
    name: 'posts',
    initialState: Posts,
    reducers: {
        toggleLiked: ( state, action ) => {
            const index = state.findIndex( ( post ) => post.id === action.payload.id )
            state[ index ].likes = Math.max( 0, state[ index ].likes + ( action.payload.isLiked ? 1 : -1 ) )
            state[ index ].isLiked = action.payload.isLiked
        }
    }
} )

export const { toggleLiked } = postsSlice.actions

export default postsSlice.reducer