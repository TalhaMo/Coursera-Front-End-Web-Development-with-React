import React, {useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function Main() {

  const [dishes, setDishes] = useState(DISHES);
  const [comments, setComments] = useState(COMMENTS);
  const [promotions, setPromotions] = useState(PROMOTIONS);
  const [leaders, setLeaders] = useState(LEADERS)

  const HomePage = () => {
    return(
        <Home 
              dish={dishes.filter((dish) => dish.featured)[0]}
              promotion={promotions.filter((promo) => promo.featured)[0]}
              leader={leaders.filter((leader) => leader.featured)[0]}/>
    );
  }
  const DishWithId = ({match}) => {
    return(
        <DishDetail dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };

  return (
    <div>
    <Header/>
    <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path='/menu' component={()=><Menu dishes={dishes}/>} />
        <Route exact path='/contactus' component={Contact}/>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Redirect to="/home" />
    </Switch>
    <Footer/>
    </div>
  );
}

export default Main;
