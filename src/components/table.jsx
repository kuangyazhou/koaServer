import React, { Component } from "react";

export default class CTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }

  render() {
    var linkStyle = { background: "blue" };
    const { data } = this.state;
    return (
      <div className="table">
        <input value="23" name="yyy" readOnly />
        <table
          cellSpacing="0"
          cellPadding="0"
          style={{ background: "#f1eded" }}
        >
          <thead>
            <tr>
              <th style={linkStyle}>姓名</th>
              <th>时间</th>
              <th>地址</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
