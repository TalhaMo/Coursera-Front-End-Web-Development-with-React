import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';


function Main({dishes,promotions,leaders,comments}) {

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
        <Route exact path='/contactus' component={()=><Contact/>}/>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route path='/aboutus' component={()=><About leaders={leaders}/>}/>
        <Redirect to="/home" />
    </Switch>
    <Footer/>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
export default withRouter(connect(mapStateToProps)(Main));
