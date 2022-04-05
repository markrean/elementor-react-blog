import { Route, Routes } from 'react-router-dom'

import Page404   from 'components/pages/404'
import Homepage  from 'components/pages/Homepage'
import Blog      from 'components/pages/Blog/Blog'
import BlogIndex from 'components/pages/Blog/Index/BlogIndex'
import BlogPost  from 'components/pages/Blog/Post/BlogPost'

const RouteList = () => (
    <Routes>
        <Route path='*'        element={ <Page404 />   } />
        <Route path='/'        element={ <Homepage />  } />
        <Route path='blog'     element={ <Blog />      }  >
            <Route index       element={ <BlogIndex /> } />
            <Route path='p:id' element={ <BlogPost />  } />
        </Route>
    </Routes>
)

export default RouteList