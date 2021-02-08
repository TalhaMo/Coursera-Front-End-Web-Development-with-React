import React, {useState} from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes'

function Main() {

  const [dishes, setDishes] = useState(DISHES);
  const [selectedDish, setSelectedDish] = useState(null);


  return (
    <div className="App">
        <Header />
        <Menu dishes={dishes} onClick={(dishId) => setSelectedDish(dishId)}/>
        <DishDetail selectedDish={dishes.filter((dish) => dish.id === selectedDish)[0]}/>
        <Footer />
    </div>
  );
}

export default Main;
