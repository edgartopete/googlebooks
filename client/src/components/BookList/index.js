import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";


// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function BookListItem({
  thumbnail = "https://placehold.it/300x300",
  title,
  authors,
  description,
  href,
  children
}) {
  return (
    <li className="list-group-item">
      <Container fluid>
        <Row >
          <Col size="xs-10 sm-10">
          <h5>{title}</h5>
          <br></br>
          <h6>Written By: {authors}</h6>
          </Col>
          <Col size="xs-2 sm-2">
            {children}
            <a className="btn btn-secondary" href={href}  target="_blank" role="button" rel="noopener noreferrer">View</a>
          </Col>
        </Row>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <p>{description}</p>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
