import React, { Component } from 'react';
import spider from './Videos/spider.mp4';
class App extends Component {
   render() {
      return (
        <div>
           <h2>NPTEL Videos</h2>
           <p>Author: </p>
           <p>Title: </p>
           <button> Get Video </button>
           <br/><br/><br/>
            <video
              controls
              src={spider}
            />
        </div>
      );
   }
}
export default App;
