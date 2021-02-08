import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
//importing mutations and querys from appollo and the query we made in the utils folder
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  //using our queries and mutations we made for graphql
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  
  const userData = data?.me || {};

 // function that accepts books params and deletes book from database
 const handleDeleteBook = async (bookId) => {
  // gettoken
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  try {
    const { data } = await removeBook({
      variables: { bookId },
    });

    // remove book from local storage
    removeBookId(bookId);
  } catch (err) {
    console.error(err);
  }
};

if (loading) {
  return <h2>LOADING...</h2>;
}

return (
  <>
    <Jumbotron fluid className='text-light bg-dark'>
      <Container>
        <h1>Viewing {userData.username}'s book collection!</h1>
      </Container>
    </Jumbotron>
    <Container>
      <h2>
        {userData.savedBooks?.length
          ? `Viewing ${userData.savedBooks.length} saved ${
              userData.savedBooks.length === 1 ? 'book' : 'books'
            }:`
          : 'You have no saved books!'}
      </h2>
      <CardColumns>
        {userData.savedBooks?.map((book) => {
          return (
            <Card key={book.bookId} border='dark'>
              {book.image ? (
                <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
              ) : null}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className='small'>Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                <Button
                  className='btn-block btn-danger'
                  onClick={() => handleDeleteBook(book.bookId)}>
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  </>
);
};

export default SavedBooks;
