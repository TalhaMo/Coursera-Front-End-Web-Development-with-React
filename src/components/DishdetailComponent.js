import React from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({dish}) {
    
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
      function RenderComments({comments}) {
      
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

const DishDetail = ({dish,comments}) => {

    if (dish != null)
    return(
        <div className="container">
            <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
                <RenderDish dish={dish}/>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={comments}/>
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
