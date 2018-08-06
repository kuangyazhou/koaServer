import "@/style/footer.less";
import React, { Component } from "react";
export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer">
                    <p>
                        Copyright &copy; 2018 <a href="/">blog news</a>
                    </p>
                    <span>footer text</span>
                </div>
            </footer>
        );
    }
}
