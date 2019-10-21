import React from 'react'

import {Route,Switch,Redirect} from 'react-router-dom'

import Index from '../components/mian/Index'
import Detial from '../components/mian/Detial'
import Whole from '../components/mian/Whole'
import Collect from '../components/mian/Collect'

var router = [
    {
        path:'/index',
        component:Index,
    },
    {
        path:'/detial',
        component:Detial,
    },
    {
        path:'/whole',
        component:Whole,
    },
    {
        path:'/collect',
        component:Collect,
    },
    {
        path:'*',
        redirect:'/index',
    },
];

const Router = ()=>{
    return(
        <div>

            <Switch>
                {
                    router.map((val,ind)=>{
                        if(val.path === '*'){
                            return <Redirect to={val.redirect} key={ind}></Redirect>
                        }else {
                            return <Route path={val.path} component={val.component} key={ind}></Route>
                        }
                    })
                }
            </Switch>
        </div>
    )
};
export default Router;