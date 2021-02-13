import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
  Button,
  FormGroup
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    
    this.state = {
      isModalOpen: false
    };
  }
 

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

 handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div >
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  type="select"
                  model=".rating"
                  name="rating"
                  id="rating"
                  className="form-control"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  name="author"
                  id="author"
                  model=".author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less"
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  rows="6"
                  name="comment"
                  id="comment"
                  model=".comment"
                  className="form-control"
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderComments({ comments,postComment,dishId }) {
  if (comments !== null && comments.length !== 0) {
    const commentsList = comments.map(comment => {
      return (
        <Fade in>
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
        </Fade>
      );
    });

    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
            <Stagger in>
            {commentsList}
            </Stagger>
          </ul>
        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderDish({ dish }) {
  return (
    <FadeTransform  in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
    <Card>
      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
    </FadeTransform>
  );
}

const DishDetail = props => {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
  else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} 
                postComment={props.postComment}
                dishId={props.dish.id}/>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
