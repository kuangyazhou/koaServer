import '@/style/pages/wordpress.less'
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Header from "@/components/header";
import Footer from "@/components/footer";

// function Counter({initialCount}) {
//     const [count, setCount] = useState(initialCount);
//     return (
//         <>
//             Count: {count}
//             <button onClick={() => setCount(initialCount)}>Reset</button>
//             <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
//             <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
//         </>
//     );
// }
function WordPress() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className="container">
        <Header current="wordpress"/>
        <div className="main">
            <p>You clicked {count} times</p>
            <Button onClick={() => setCount(count + 1)}>
                Click me
            </Button>
        </div>
      <Footer/>
    </div>
  );
}

export default WordPress;