import React from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

const DishDetail = ({selectedDish}) => {

   const renderComments=(comments)=> {
        let list = (<div></div>);
        if (comments != null) {
            list = (
                <ul className="list-unstyled">
                    {comments.map(el => {
                        return (
                            <li key={el.id}>
                                <p>{el.comment}</p>
                                <p>-- {el.author},&nbsp; {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(el.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
            );
        }
        return (
            <div>
                <h4>Comments</h4>
                {list}
            </div>
        );

    }
    const renderDish=(dish)=> {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
      }
    
    if (selectedDish != null)
    return(
        <div className="container">
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
                {renderDish(selectedDish)}
            </div>
            <div className="col-12 col-md-5 m-1">
                {renderComments(selectedDish.comments)}
            </div>
        </div>
        </div>
    );
else
    return(
        <div></div>
    );
}

export default DishDetail
