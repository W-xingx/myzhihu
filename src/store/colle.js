import React from 'react'

import {Dispatcher} from 'flux'


import EventEmitter from 'events'

class State extends EventEmitter{
    id = '';
}

var state = new State();


var dispatcher = new Dispatcher();


dispatcher.register((action)=>{
    switch (action.actionType){
        case 'changeName':
            state.id = action.actionParams;
            state.emit('chang');
            break;
    }
});



export default {
    state,
    dispatcher,
}