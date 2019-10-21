import React from 'react'
import '../../assets/css/index.css'
import axios from 'axios'
/*banner图，轮播图*/
import {Carousel, WingBlank} from 'antd-mobile';
/*导航栏*/
import { Drawer, List, NavBar, Icon } from 'antd-mobile';


import Lin from '../../assets/images/ling1.png'
import Lie from '../../assets/images/ling2.png'
import Lig from '../../assets/images/ling3.png'

/*import Ban from '../../assets/images/banner.png'
import News from '../../assets/images/news.png'*/
import Head from '../../assets/images/head.png'
import Star from '../../assets/images/star.png'
import Load from '../../assets/images/load.png'
import First from '../../assets/images/first.png'
var weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
class Index extends React.Component {
    state = {
        /*导航栏*/
        open: false,
        /*banner图*/
        imgHeight: 176,
        bannArr:[],
        /*滚动事件*/
        date:(new Date()).toLocaleDateString().replace(/\//g, ""),
        newsArr:[],

    };
    handleScroll=()=> {
        let clientHeight = document.documentElement.clientHeight; //可视区域高度
        let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
        let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度
        if (scrollTop+clientHeight >= scrollHeight ) {
            axios.get('/api/4/news/before/'+this.state.date).then((res)=>{
                // console.log(res.data.date);
                this.state.newsArr.push(res.data);
                this.setState({
                    date:res.data.date,
                });
            })
        }
    };


    gone(){
        this.props.history.push({
            pathname:'/collect',
        });
    };
    onOpenChange = (...args) => {
        // console.log(args);
        this.setState({ open: !this.state.open });
    };
    run(id){
        this.props.history.push({
            pathname:'/detial',
            state:{
                id,
            }
        });
    };
    render() {
        const sidebar = (
            <List>
                <div className="index_name">
                                  <div className="name_ima">
                                      <img src={Head} className="ima_img"/>
                                      <span className="ima_name">小仙女是我</span>
                                  </div>
                                  <div className="index_class">
                                      <div className="class_left" onClick={this.gone.bind(this)}>
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
                                    <li>
                                        <img src={First} className="life_ima"/>
                                        <span className="life_title">首页</span>
                                    </li>
                                </ul>
                            </div>
            </List>
        );
        return (
            <div>
                {/*顶部*/}
                <div className="index_top"></div>
                <div>
                    {/*导航栏*/}
                    <div className="index_navtop">
                                <div className="index_nav">
                        <div className="nav_left">
                            <img src={Lig} className="nav_lig" onClick={this.onOpenChange.bind(this)}/>
                            <span className="nav_fis">首页</span>
                        </div>
                        <div className="nav_right">
                            <img src={Lin} className="nav_lin"/>
                            <img src={Lie} className="nav_lie"/>
                        </div>
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
                    {/*banner图*/}
                    <div className="index_banner">
                        <WingBlank>
                            <Carousel
                                autoplay={false}
                                infinite>
                                {
                                    this.state.bannArr.map((val,ind) => (
                                    <a
                                        key={ind}
                                        style={{display: 'inline-block', width: '100%', height: this.state.imgHeight,position:'relative'}}
                                        onClick={this.run.bind(this,val.id)}
                                    >
                                        <img
                                            src={val.image}
                                            style={{width: '100%', verticalAlign: 'top'}}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({imgHeight: 'auto'});
                                            }}
                                        />
                                        <span style={{position:'absolute',bottom:'0.5rem',left:'0.6rem',right:'0',fontSize:'0.4rem',color:'#fff',zIndex:'999',fontWeight:'bold'}}>{val.title}</span>
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    {/*新闻列表*/}
                    <div className="index_list">
                         {/*  <h2 className="list_topic">今日热闻</h2>
                           <ul className="list_news">
                                {
                                    this.state.newsArr.map((val,ind)=>{
                                                return <li key={ind} onClick={this.went.bind(this,val.id)}>
                                                    <div className="news_left">
                                                        <p>{val.title}</p>
                                                    </div>
                                                 <div className="news_right">
                                                        <img src={val.images}/>
                                                 </div>
                                                </li>
                                      })
                                 }
                         </ul>*/}
                        {
                            this.state.newsArr.map((val,ind)=>{
                                return <div key={ind}>
                                        <h2 className="list_topic">{val.date === (new Date()).toLocaleDateString().replace(/\//g, "")?'今日热闻':val.date.substr(4,2)+"月"+val.date.substr(6,2)+"日"+weekArr[new Date(val.date.substr(0,4)+"-"+val.date.substr(4,2)+'-'+val.date.substr(6,2)).getDay()]}</h2>
                                        <ul className="list_news">
                                            {
                                                val.stories.map((value,index)=>{
                                                    return <li key={index}  onClick={this.went.bind(this,value.id)}>
                                                        <div className="news_left">
                                                            <p>{value.title}</p>
                                                        </div>

                                                        <div className="news_right">
                                                            <img src={value.images}/>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                            })
                        }

                    </div>
                </div>

            </div>
        )
    };
    went(id){
        this.props.history.push({
            pathname:'/detial',
            state:{
                id,
            }
        });
    };
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);

        axios.get('/api/4/news/latest').then((res) => {
            // console.log(res.data);
            this.state.newsArr.push(res.data);
            this.setState({
                bannArr:res.data.top_stories
            });
        });
        window.addEventListener('scroll', this.handleScroll);
    };

};

export default Index;