import React from 'react'

import '../../assets/css/whole.css'

import axios from 'axios'


import Back from '../../assets/images/back.png'
import Long from '../../assets/images/long1.png'
import Down from '../../assets/images/down.png'
import Up from '../../assets/images/up.png'
import Chart from '../../assets/images/chart.png'
import Zans from '../../assets/images/zans.png'
// import a from 'http://pic4.zhimg.com/aefba8a23097cd9b3bb42d1de406ab2f_im.jpg'
import { Accordion, List } from 'antd-mobile';



class Whole extends React.Component{
    state ={
        longArr:[],
        shortArr:[],
    };
    render(){
        var a = 'http://pic4.zhimg.com/aefba8a23097cd9b3bb42d1de406ab2f_im.jpg';
        function doubleNum(n) {
            const str = "" + n;
            // return str[1] ? str : `0${str}`;
            return str.padStart(2, "0");
        }
        function date(timestamp, sep = "-") {
            var _date = new Date(timestamp);
            var year = _date.getFullYear();
            var month = _date.getMonth() + 1;
            var day = _date.getDate();
            return [year, month, day].map(doubleNum).join(sep);
        }
        function time(timestamp, sep = ":") {
            var _date = new Date(timestamp);
            var hours = _date.getHours();
            var minutes = _date.getMinutes();
            var seconds = _date.getSeconds();
            return [hours, minutes, seconds].map(doubleNum).join(sep);
        }
        function dateTime(timestamp, dateSep = "-", timeSep = ":") {
            return date(timestamp, dateSep) + " " + time(timestamp, timeSep);
        }
        return(
            <div>
                {/*顶部*/}
                <div className="index_top"></div>
                {/*导航栏*/}
                <div className="detial_navd">
                    <div className="navd_left">
                        <img src={Back} className="left_back" onClick={this.back.bind(this)}/>
                        <span className="left_info">{this.state.longArr.length+this.state.shortArr.length}条点评</span>
                    </div>
                    <div className="navd_right">
                        <img src={Long} className="right_share"/>
                    </div>
                </div>
                {/*长评论*/}
                <div className="whole_long">
                    <div>
                        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header={this.state.longArr.length===0?'0条长评':this.state.longArr.length+'条长评'}>
                                <List className="my-list">
                                    <div style={{display:this.state.longArr.length===0?'none':'block'}}>
                                         {
                                         this.state.longArr.map((val,ind)=>{
                                             return <List.Item key={ind}>
                                                 <div className="long_per">
                                                     <div className="pers_ima">
                                                        <img src={val.avatar} className="ima_img"/>
                                                     </div>
                                                     <div className="pers_rev">
                                                         <h2>{val.author}</h2>
                                                         <p>{val.content}</p>
                                                         <span>{dateTime(val.time)}</span>
                                                     </div>
                                                     <div className="pers_zan">
                                                         <img src={Zans} className="zan_ima"/>
                                                         <span>{val.likes}</span>
                                                     </div>
                                                 </div>
                                             </List.Item>
                                         })
                                         }
                                    </div>
                                    <div className="long_reve" style={{display:this.state.longArr.length===0?'block':'none'}}>
                                        <div className="long_cont">
                                            <img src={Chart} className="long_ima"/>
                                            <p className="long_word">深度长评虚位以待</p>
                                        </div>
                                    </div>
                                </List>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                </div>
                {/*短评论*/}
                <div className="whole_short">
                    <div>
                        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header={this.state.shortArr.length===0?'0条短评':this.state.shortArr.length+'条短评'}>
                                <List className="my-list">
                                    {
                                        this.state.shortArr.map((val,ind)=>{
                                           return  <List.Item key={ind}>
                                               <div className="long_per">
                                                   <div className="pers_ima">
                                                       <img src={val.avatar} className="ima_img"/>
                                                   </div>
                                                   <div className="pers_rev">
                                                       <h2>{val.author}</h2>
                                                       <p>{val.content}</p>
                                                       <span>{dateTime(val.time)}</span>
                                                   </div>
                                                   <div className="pers_zan">
                                                       <img src={Zans} className="zan_ima"/>
                                                       <span>{val.likes}</span>
                                                   </div>
                                               </div>
                                           </List.Item>
                                        })
                                    }
                                   {/* <List.Item>
                                        <div className="long_per">
                                            <div className="pers_ima">
                                                <img src={a} className="ima_img"/>
                                            </div>
                                            <div className="pers_rev">
                                                <h2>四热门多做挂</h2>
                                                <p>第一条那个，我家就在高速出口旁边，很认真地说一句，现在的货车过地磅时，会猛加油门冲过去，这样地磅显示数就会比实际小很多。一次不行会过两次三次。后面堵一排货车按喇叭。大货车一般又是夜晚行车，半夜这样真的是太扰民了。</p>
                                                <span>01-08 19:05</span>
                                            </div>
                                            <div className="pers_zan">
                                                <img src={Zans} className="zan_ima"/>
                                                <span>5</span>
                                            </div>
                                        </div>
                                    </List.Item>*/}
                                </List>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    };
    back(){
        this.props.history.go(-1);
    };
    componentDidMount(){
        var id = this.props.history.location.state.id;
        axios.get('/api/4/story/'+ id +'/long-comments').then((res)=>{
            // console.log(res.data.comments);
            this.setState({
                longArr:res.data.comments,
            })
        });
        axios.get('/api/4/story/'+ id +'/short-comments').then((res)=>{
            // console.log(res.data);
            this.setState({
                shortArr:res.data.comments,
            })
        });


    }
}
export default Whole