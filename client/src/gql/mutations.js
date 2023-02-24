import { gql } from '@apollo/client';

export const ADD_PERSON = gql`
  mutation AddPerson($personID: ID!, $firstName: String!, $lastName: String!) {
    addPerson(id: $personID, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar($carID: ID!, $year: String!, $make: String!, $model: String!, $price: String!, $personID: ID!) {
    addCar(id: $carID, year: $year, make: $make, model: $model, price: $price, personId: $personID) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($personID: ID!, $firstName: String, $lastName: String) {
    updatePerson(id: $personID, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($carID: ID!, $year: String, $make: String, $model: String, $price: String, $personID: ID) {
    updateCar(id: $carID, year: $year, make: $make, model: $model, price: $price, personId: $personID) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($personID: ID!) {
    deletePerson(id: $personID) {
      id
      firstName
      lastName
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($carID: ID!) {
    deleteCar(id: $carID) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;
