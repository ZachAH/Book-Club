// import the template literal form graphql
import gql from 'graphql-tag';
//name the query for graphql then retrieve  all the data related to the logged in user
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
