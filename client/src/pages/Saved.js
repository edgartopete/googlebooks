import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Row,Container } from "../components/Grid";
import { BookList, BookListItem } from "../components/BookList";
import { ActionBtn } from "../components/ActionBtn";


class Books extends Component {
  state = {
    gbooks: [],
    title: "",
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ gbooks: res.data, title: ""})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
      <Container>
          <Row size="xs-12">
            {this.state.gbooks.length ? (
              <BookList>
                {this.state.gbooks.map((items, index) => {
                  return (
                    <BookListItem
                      key={items._id}
                      title={items.title}
                      authors={items.authors}
                      href={items.href}
                      description={items.description}
                      thumbnail={items.thumbnail}
                    >
                      <ActionBtn onClick={() => this.deleteBook(items._id)}>
                        Delete
                      </ActionBtn>
                    </BookListItem>
                  );

                }
                )}
              </BookList>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Row>  
      </Container>
      </div>
    );
  }
}

export default Books;
