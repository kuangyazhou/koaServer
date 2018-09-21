import '@/style/pages/writer.less';
import React, { Component } from "react";
import { Button, Row, Modal, Col, Icon, Form, Input } from "antd";
import PublicEditors from "@/components/editors";
import request from "@/utils/axios";
const FormItem = Form.Item;

class Writer extends Component {
    constructor(props) {
        super(props);
        // 默认给一个empty的editorstate
        this.state = {
            changeWj: false,
            changeWz: false,
            changeSet: false,
            ModalText1: '如果你在使用编辑器的过程中遇到问题，可以尝试以下方案解决：',
            ModalText2: '1. Windows用户尽量将浏览器设置为极速模式，不要使用兼容模式写作',
            ModalText3: '2.推荐使用chrome浏览器，创作体验更加流畅',
            ModalText4: '3.浏览器插件可能与编辑器功能冲突，可以在使用编辑器时禁用插件',
            visible: false,
            listDefaultIndex: 0,
            artDefaultIndex: 0,
            listContainer: [
                {
                    text: '日记本',
                    settings: 'setting',
                    edit: '修改文集',
                    delete: '删除文集',
                },
                {
                    text: '随笔',
                    settings: 'setting',
                    edit: '修改文集',
                    delete: '删除文集',
                }
            ],
            artList: [
                {
                    letter: '16',
                    desc: '冬枣的营养成分表 榴莲的营养成分表',
                    title: '营养成分截图',
                    settings: 'setting',
                    isConfirm: false,
                    icons: [
                        {
                            type: 'icon-fabu',
                            font: 'iconfont icon-fabu',
                            text: '直接发布'
                        },
                        {
                            type: 'folder-open',
                            text: '移动文章'
                        },
                        {
                            type: 'clock-circle-o',
                            text: '历史版本'
                        },
                        {
                            type: 'delete',
                            text: '删除文章'
                        }
                    ]
                },
                {
                    letter: '16',
                    desc: '冬枣的营养成分表 榴莲的营养成分表',
                    title: '营养成分截图',
                    settings: 'setting',
                    isConfirm: true,
                    icons: [
                        {
                            type: 'icon-fabu',
                            font: 'iconfont icon-fabu',
                            text: '直接发布'
                        },
                        {
                            type: 'folder-open',
                            text: '移动文章'
                        },
                        {
                            type: 'clock-circle-o',
                            text: '历史版本'
                        },
                        {
                            type: 'delete',
                            text: '删除文章'
                        }
                    ]
                }
            ]
        };
        this.changeWenji = this._changeWenji.bind(this);
        this.changeWenzhang = this._changeWenzhang.bind(this);
        this.changeSetting = this._changeSetting.bind(this);
        this.newArtical = this._newArtical.bind(this);
    }
    _changeWenji() {
        this.setState(prevState => ({
            changeWj: !prevState.changeWj
        }));
    }
    _changeWenzhang() {
        this.setState(prevState => ({
            changeWz: !prevState.changeWz
        }));
    }
    changeList(index) {
        this.setState({ listDefaultIndex: index });
    }
    changeArt(index) {
        this.setState({ artDefaultIndex: index });
    }
    _changeSetting() {
        this.setState(prevState => ({
            changeSet: !prevState.changeSet
        }));
    }
    _newArtical() {
        request
            .get('/api/article/', localStorage.userId)
            .then(res => {
                if (res.status === '0'){

                }
            })
    }
    showModal(visible) {
        this.setState({ visible });
    }
    componentDidMount() {}
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, ModalText1, ModalText2, ModalText3, ModalText4, listContainer, listDefaultIndex, artDefaultIndex, artList} = this.state;
        return (
            <Row className="write">
                <Col span={4} className="left-item">
                    <div className="back-btn">
                        <a href="/">回首页</a>
                    </div>
                    <div className="news_wj_wrapper">
                        <div className="news_wj">
                            <Icon type="plus" />新建文集
                        </div>
                        <div className="_2G97m">
                            <Form layout="inline" onSubmit={this.handleSubmit}>
                                <FormItem>
                                    {getFieldDecorator('wjName', {
                                        rules: [{ required: true, message: '请输入文集名!' }],
                                    })(
                                        <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入文集名" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button htmlType="submit">
                                        提交
                                    </Button>
                                    &nbsp;&nbsp;<a href="" className="cancel-btn">取消</a>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                    <ul className="write_ul write_ac">
                    {
                        listContainer.map((item, index) => {
                            return(
                                <li className={listDefaultIndex === index ?'write_list _31PCv': 'write_list'} alt={item.text} key={index} onClick={() => this.changeList(index)}>
                                    {listDefaultIndex === index 
                                    ?<div className="write_list_set">
                                        <Icon type={item.settings} onClick={this.changeWenji}/>
                                        <span>
                                            <ul className={this.state.changeWj?'write_list_change active': 'write_list_change'}>
                                                <li className="_2po2r cRfUr">
                                                    <Icon type="edit" />{item.edit}
                                                </li>
                                                <li className="_2po2r cRfUr">
                                                    <Icon type="delete" />{item.delete}
                                                </li>
                                            </ul>
                                        </span>
                                    </div>: ''}
                                    <span>{item.text}</span>
                                </li>
                            )
                        })
                    }
                    </ul>
                    <Col span={4} className="settings">
                        <span className="ant-dropdown-trigger" onClick={this.changeSetting}>
                            <Icon type="setting"/>设置
                            <span>
                                <ul className={this.state.changeSet?'set_list_change active': 'set_list_change'}>
                                    <li className="_2po2r">
                                        <Icon type="edit" />默认编辑器
                                    </li>
                                    <li className="_2po2r">
                                        <Icon type="delete" />设置显示模式
                                    </li>
                                    <li className="_2po2r">
                                        <Icon type="delete" />回收站
                                    </li>
                                    <li className="_2po2r">
                                        <Icon type="question-circle-o" />帮助与反馈
                                    </li>
                                </ul>
                            </span>
                        </span>
                        <span className="ant-dropdown-question">
                            <span onClick={() => this.showModal(true)}>遇到问题<Icon type="question-circle-o" /></span>
                            <Modal
                                title={<span>常见问题 绑定遇到问题？<a href="https://www.jianshu.com/p/794b92192f62">点击查看帮助</a></span>}
                                centered
                                visible={visible}
                                onOk={() => this.showModal(false)}
                                onCancel={() => this.showModal(false)}
                                footer={null}
                            >
                                <p>{ModalText1}</p>
                                <p>{ModalText2}</p>
                                <p>{ModalText3}</p>
                                <p>{ModalText4}</p>
                            </Modal>
                        </span>
                    </Col>
                </Col>
                <Col span={20} className="right-container">
                    <Row>
                        <Col span={6} className="center-item">
                            <div className="add_art" onClick={this.newArtical}>
                                <Icon type="plus-circle-o" /> 新建文章
                            </div>
                            <ul className="art-list-ul">
                            {
                                artList.map((item, index) => {
                                    return(
                                        <li className={artDefaultIndex === index ?'write_list _33nt7': 'write_list'} alt={item.text} key={index} onClick={() => this.changeArt(index)}>
                                            {item.isConfirm? <i className="unconfirm  confirm"></i>: <i className="unconfirm"></i>}
                                            {artDefaultIndex === index 
                                            ?<div className="write_list_set">
                                                <Icon type={item.settings} onClick={this.changeWenzhang}/>
                                                <span>
                                                    <ul className={this.state.changeWz?'write_list_change active': 'write_list_change'}>
                                                    {
                                                        item.icons.map((icon, idx) => {
                                                            return(
                                                                <li className="_2po2r cRfUr" key={idx}>
                                                                    {icon.font?
                                                                    <i className={icon.font}></i>:
                                                                    <Icon type={icon.type} />
                                                                    }
                                                                    {icon.text}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                    </ul>
                                                </span>
                                            </div>: ''}
                                            <span className="art-title">{item.title}</span>
                                            {artDefaultIndex === index?<span className="art-desc">{item.desc}</span>:''}
                                            {artDefaultIndex === index?<span className="art-letter">字数：{item.letter}</span>:''}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </Col>
                        <Col span={18} className="right-item">
                            <PublicEditors />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}




export default Writer = Form.create({})(Writer)