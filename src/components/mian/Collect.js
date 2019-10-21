import React from 'react'


import { Drawer, List, NavBar, Icon } from 'antd-mobile';

import '../../assets/css/collect.css'
import Lin from '../../assets/images/ling3.png'
// import News from '../../assets/images/news.png'
import Head from '../../assets/images/head.png'
import Star from '../../assets/images/star.png'
import Load from '../../assets/images/load.png'
import First from '../../assets/images/first.png'


class Collect extends React.Component{
    state={
        // id:Store.state.id
        /*导航栏*/
        open: false,
        infoArr:[],
    };
    onOpenChange = (...args) => {
        // console.log(args);
        this.setState({ open: !this.state.open });
    };
    come(){
        this.props.history.push({
            pathname:'/index'
        })
    };
    came(id){
        this.props.history.push({
            pathname:'/detial',
            state:{
                id,
            }
        })
    }
    render(){
        const sidebar = (
                        <List>
                              <div className="index_name">
                            <div className="name_ima">
                                <img src={Head} className="ima_img"/>
                                <span className="ima_name">小仙女是我</span>
                            </div>
                            <div className="index_class">
                                <div className="class_left" onClick={this.come.bind(this)}>
                                    <img src={Star} className="left_col"/>
                                    <span className="left_word">我的收藏</span>
                                </div>
                                <div className="class_right">
                                    <img src={Load} className="left_col"/>
                                    <span className="left_word">离线下载</span>
                                </div>
                            </div>
                        </div>
                              <div className="index_life">
                            <ul className="life_list">
                                <li onClick={this.come.bind(this)}>
                                    <img src={First} className="life_ima"/>
                                    <span className="life_title">首页</span>
                                </li>
                            </ul>
                        </div>
                        </List>
        );
        return(
            <div>
                <div>
                    {/*顶部*/}
                    <div className="index_top"></div>
                    {/*导航*/}
                    <div>
                        <div className="collect_navc">
                            <img src={Lin} className="navc_ima" onClick={this.onOpenChange.bind(this)}/>
                            <span className="navc_numc">{this.state.infoArr.length}条收藏</span>
                        </div>
                        <Drawer
                            className="my-drawer"
                            style={{ minHeight: document.documentElement.clientHeight }}
                            enableDragHandle
                            contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                            sidebar={sidebar}
                            open={this.state.open}
                            onOpenChange={this.onOpenChange}>
                        </Drawer>
                    </div>
                    {/*收藏内容*/}
                    <div className="collect_cont">
                        <ul className="list_news">
                            {
                                this.state.infoArr.map((val,ind)=>{
                                    return <li key={ind} onClick={this.came.bind(this,val.id)}>
                                        <div className="news_left">
                                            <p>{val.title}</p>
                                        </div>

                                        <div className="news_right">
                                            <img src={val.ima}/>
                                        </div>
                                    </li>
                                })

                            }
                           {/* <li>
                                    <div className="news_left">
                                        <p>伴侣向你道歉时，你该不该反问：[你错哪？]</p>
                                    </div>

                                    <div className="news_right">
                                        <img src={News}/>
                                    </div>
                            </li>
                           */}
                        </ul>
                    </div>

                </div>
            </div>
        )
    };
    componentDidMount(){
        var arr = [];
        //localStorage.key(i)
        for(var i=0;i<localStorage.length;i++){
            arr[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        // console.log(arr);
        this.setState({
            infoArr:arr,
        });
    }
};
export default Collect;