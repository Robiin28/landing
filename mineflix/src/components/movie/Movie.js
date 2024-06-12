import React, {useState} from 'react';
import MovieDetails from './MovieDetails';
import Button from './Button';


const watch = () => {
    console.log("watching");
};
const boxStyle = {
  margin: 20,
  padding: 20,
  border: '2px solid black',
  borderRadius: '8px',
  fontFamily: 'Arial'
}

function Movie(props) {

    let [productCount, updateCount] = useState(0);



    const display = () => {
    
    return productCount > 0 ? productCount : "zero";
}
const increment = () => {
    updateCount(++productCount);
     console.log(productCount);
}
const decrement = () => {
 updateCount(--productCount);
      console.log(productCount);
}
const badgeStyle = {
    fontSize: '20px',
    color: props.active ? 'green' : 'red'
  };
    return (
      

        <div style={boxStyle}>
    <div className="App" style={{backgroundColor:props.active ? 'white':'gray' }}>
        <li>
              <img
                      src={props.imageUrl}
                      style={{ height: 200, width: 200 }}
                      alt="img"
                  />
          <h4 className="name" style={{ color: 'red' }}>
            {props.name}
          </h4>
          <h5>{props.description}</h5>
          <div className="price">
            <h6>${props.price}</h6>
            <span>{props.rating}</span>
          </div>
                  <span className="activeCheck" style={ badgeStyle }>{props.active ? 'active':'not active'}</span>
              <MovieDetails
                  totalRating={props.totalRating}
                  year={props.year}
                  duration={props.duration}
                  genres={props.genres}
                  actors={props.actors}
                  />
              <div>
              <Button eventHandler={increment}
                disable={false}
                  >+</Button>
              <Button eventHandler={decrement}
              disable={productCount===0}
              
              >_</Button>
                  <button onClick={watch}> watch </button>
              </div>
              <h4>{ display()}</h4>
          </li>
        </div> 
        </div>
  );
}
// can also used like this
//   return React.createElement('div', {},
//     React.createElement('div', { className: 'badge', style: badgeStyle }, props.active ? 'Active' : 'Not Active'),
//     React.createElement('h6', { style: { color: 'red', marginRight: 20 } }, props.name),
//     React.createElement(Button, {}, '+')
//   );
export default Movie;
