import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { BookList, BookListItem } from "../components/BookList";
import { ActionBtn } from "../components/ActionBtn";

class Books extends Component {
  state = {
    gbooks: [],
    title: "",
    authors: "",
    description: "",
    href: "",
    thumbnail: ""

  };


  loadBooks = () => {
    API.getGBooks(this.state.title)
      .then(res => this.setState({ gbooks: res.data.items, title: "" }))
      .catch(err => console.log(err));
  };

  reloadBook = index =>{
    let newBooks= this.state.gbooks;

    newBooks.splice(index,1);

    this.setState({gbooks:newBooks});
    
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      this.loadBooks();
    }
  };

  handleSaveButton = index => {

    const key = index;
    API.saveBook({
      title: this.state.gbooks[key].volumeInfo.title,
      authors:this.state.gbooks[key].volumeInfo.authors[0],
      description: this.state.gbooks[key].volumeInfo.description,
      href:this.state.gbooks[key].volumeInfo.previewLink,
      thumbnail:this.state.gbooks[key].volumeInfo.imageLinks.smallThumbnail
    })
      .then(res => this.reloadBook(index))
      .catch(err => console.log(err));

  };

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Search Books you whant to read</h1>
        </Jumbotron>
        <Container  >
          <Row>
            <Col size="md-12">
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Book title to search!"
                />
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Search
              </FormBtn>
              </form>
            </Col>

          </Row>
          <Row size="xs-12">
            {this.state.gbooks.length ? (
              <BookList>
                {this.state.gbooks.map((items, index) => {
                  return (
                    <BookListItem
                      key={index}
                      title={items.volumeInfo.title}
                      authors={items.volumeInfo.authors}
                      href={items.volumeInfo.previewLink}
                      description={items.volumeInfo.description}
                      thumbnail={items.volumeInfo.imageLinks.smallThumbnail}
                    >
                      <ActionBtn onClick={() => this.handleSaveButton(index)} > 
                        Save 
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
