// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";

const USER = require("../models/user");
const USERSCHEMA = require("../models/userschema");
const userMysql = require("../mysql/query");

/**
 *  分红列表
 * @param name password
 * @returns {Promise}
 */
exports.login = async (ctx, next) => {
    const { name, password } = ctx.query; //get获取参数
    // const { name, password } = ctx.request.body; //post获取参数
    const result = await USERSCHEMA.find({ username: name });

    const token = jwt.sign(
        {
            name: name,
            password: password
            // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
        },
        "token",
        { expiresIn: "2h" }
    );
    console.log(name, password, result, token);
    if (result.length == 0) {
        // if (!result || result.length == 0) {
        ctx.body = {
            status: "1",
            data: [],
            msg: "用户名不存在"
        };
        // next();
        return;
    }
    if (result && result[0].password === password) {
        ctx.body = {
            status: "0",
            // data: result
            data: [],
            token: token
        };
    } else {
        ctx.body = {
            status: "-1",
            data: [],
            msg: "用户名或者密码错误"
        };
    }
};

exports.getlogin = async (ctx, next) => {
    const { name, password } = ctx.query; //get获取参数
    // const { name, password } = ctx.request.body; //post获取参数
    const result = await USERSCHEMA.find({ username: name });
    console.log(name, password, result);
    if (result.length == 0) {
        // if (!result || result.length == 0) {
        ctx.body = {
            status: "1",
            data: [],
            msg: "用户名不存在"
        };
        // next();
        return;
    }
    if (result && result[0].password === password) {
        ctx.body = {
            status: "0",
            // data: result
            data: []
        };
    } else {
        ctx.body = {
            status: "-1",
            data: [],
            msg: "用户名或者密码错误"
        };
    }
};

exports.register = async ctx => {
    const { name, password, tel } = ctx.query;
    const time = new Date().getTime();
    const find = await USERSCHEMA.find({ username: name });
    console.log(name, password, find, time);
    if (find.length == 0) {
        const result = await USERSCHEMA.create({
            username: name,
            password: password,
            tel: tel,
            time: time
        });
        console.log(result);
        ctx.body = {
            status: "0",
            data: [],
            msg: "注册成功"
        };
    } else {
        ctx.body = {
            status: "2",
            data: [],
            msg: "用户名已存在"
        };
    }
};

exports.user = async ctx => {
    await ctx.render("index", {
        title: "Hello Koa 2!"
    });
};

exports.userDB = async ctx => {
    // let data = await USER.find().sort({ _id: -1 });
    let data = null;
    const param = ctx.params.type;
    switch (param) {
        case "sort":
            data = await USER.find().sort({ _id: -1 });
            break;
        case "size":
            data = await USER.find({
                by: "yiibai tutorials",
                $or: [{ likes: "210" }, { likes: 30 }]
            });
            break;
        case "and":
            data = await USER.find({ $and: [{}, {}] });
            break;
        default:
            data = await USER.find().exec();
    }

    // console.log(data);
    ctx.body = {
        status: "0",
        data: data
        // param: param
    };
};

exports.mysql = async ctx => {
    const data = await userMysql.getUser();
    console.log(data);
    ctx.body = {
        status: "0",
        data: data
    };
};

exports.insert = async ctx => {
    const data = await userMysql.setUser();
    ctx.body = {
        status: "0",
        data: data
    };
};

exports.del = async ctx => {
    const data = await userMysql.del();
    ctx.body = {
        status: "0",
        data: data
    };
};
