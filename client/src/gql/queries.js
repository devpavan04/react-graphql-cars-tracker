import { gql } from '@apollo/client';

export const GET_PEOPLE = gql`
  query People {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const GET_CARS = gql`
  query Cars {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const GET_PERSON_BY_ID = gql`
  query PersonById($personID: ID!) {
    person(id: $personID) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_CARS_BY_PERSON_ID = gql`
  query CarsByPersonId($personID: ID!) {
    carsByPersonId(personId: $personID) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;
