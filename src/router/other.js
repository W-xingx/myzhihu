import React from 'react'

import {Route,Switch,Redirect} from 'react-router-dom'

import Long from '../components/class/Long'
import Short from '../components/class/Short'
var router = [
    {
        path:'/whole/short',
        component:Short,
    },
    {
        path:'/whole/long',
        component:Long,
    },
    {
        path:'*',
        redirect:'/detial/long',
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