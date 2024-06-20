import React ,{useState} from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import FilterProduct from './components/filterProduct/FilterProduct';
import ProductList from './components/movie/ProductList';
import CreateProduct from './components/createProduct/CreateProduct';
import Login from './components/login/Login';
import SignUp from'./components/signUp/sign-up';
import Form from './components/Form';

 const movie = [
     {
        "id":1,
        "name": "Abduction",
        "image":"image/blackwalltemp.jpg",
        "description":"movie based on real life experience",
        "ratings":4.8,
        "totalRating":300,
        "year":1990,
        "releaseDate":"2013-09-04T00:00:00Z",
        "genres":[
            "action",
            "Romance",
            "Thriller"
                 ],
        "duration":190,
        "director":["David Moyis"],
        "coverImage":"Riddick-2023.jpg",
        "actors":[
            "Vin Diesel",
            "Karl Urban",
            "Kate Sackhoff"
                 ],
        "price": 50,
        "active":true

    },
    {
        "id":2,
        "name": "The Dark Knight Rises",
        "description":"movie based on real life experience",
        "ratings":4.6,
        "totalRating": 230,
          "image":"image/blackwalltemp.jpg",
        "year":1990,
        "releaseDate":"2014-09-04T00:00:00Z",
        "genres":[
            "Horror",
            "Romance",
            "crime",
            "Thriller"
                 ],
        "duration":190,
        "director":["Rawson Marshall Thurber"],
        "coverImage":"th-dark-knight-rises-2012.jpg",
        "actors":[
            "Christian Bale",
            "Tom Hardy",
            "Anne Hathay"
                 ],
        "price": 30,
        "active":false
    },
    {
        "id":3,
        "name": "The Shawshank Redemption",
        "description": "A story of hope and friendship in the confines of Shawshank State Penitentiary.",
        "ratings": 4.9,
        "totalRating": 500,
        "year": 1994,
        "releaseDate": "1994-10-14T00:00:00Z",
          "image":"image/blackwalltemp.jpg",
        "genres": [
            "Drama",
            "Crime"
        ],
        "duration": 142,
        "director": ["Frank Darabont"],
        "coverImage": "shawshank_redemption.jpg",
        "actors": [
            "Tim Robbins",
            "Morgan Freeman"
        ],
        "price": 35,
        "active":true
    }
];
function App() {

    const[isLoggedIn,updateIsLoggedIn]=useState(false);
    const loginHandler=(email,password)=>{
    updateIsLoggedIn(true);
    }
    const logoutHandler=()=>{
        updateIsLoggedIn(false);
    }
    let [newMovie, updateMovie] = useState(movie);
    let [filterTextValue, updateFilter] = useState('all');
    let filterMovie = newMovie.filter((movies) => {
        if (filterTextValue === 'active') {
            return movies.active === true;
        }
        else if (filterTextValue === 'not active') {
            return movies.active === false;
        }
                       return true;
    })


    const filter = (filter) => {
        updateFilter(filter);

    }
    const addProduct = (mov) => {
        mov.id = newMovie.length + 1;
        updateMovie([mov,...newMovie]);
    }

    return (
    <>
{/*                         
                           <Nav />
                            <Home />
                            <CreateProduct createProduct={addProduct} />
                            <FilterProduct filterValue={ filter} />
                           <ProductList newMovie={filterMovie} />  */}
                        
           {/* <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
           <main>
                {!isLoggedIn ? (
                    <Login onLogin={loginHandler} />
                ) : (
                    <Home onLogout={logoutHandler} />
                )}
           </main>                    */}
           <Login></Login>
           {/* <SignUp/> */}

           {/* <Form /> */}
    </>
  );
}
export default App;
