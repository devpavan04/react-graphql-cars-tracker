import { gql } from 'apollo-server-express';

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates',
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs',
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds',
  },
];

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1',
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1',
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1',
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2',
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2',
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2',
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3',
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3',
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3',
  },
];

const typeDefs = gql`
  # Person type
  type Person {
    id: ID! # Person id - unique and required
    firstName: String! # Person first name - required
    lastName: String! # Person last name - required
  }

  # Car type
  type Car {
    id: ID! # Car id - unique and required
    year: String! # Car year - required
    make: String! # Car make - required
    model: String! # Car model - required
    price: String! # Car price - required
    personId: ID! # Car person id - required
  }

  type Query {
    # Queries for people
    # Get all people
    people: [Person]
    # Get a person by id - id is required
    person(id: ID!): Person

    # Queries for cars
    # Get all cars
    cars: [Car]
    # Get a car by id - id is required
    car(id: ID!): Car
    # Get all cars by person id - personId is required
    carsByPersonId(personId: ID!): [Car]
  }

  type Mutation {
    # Mutations for people
    # Add a person - id, firstName, and lastName are required
    addPerson(id: ID!, firstName: String!, lastName: String!): Person
    # Update a person - id is required, firstName and lastName are optional
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    # Delete a person - id is required
    deletePerson(id: ID!): Person

    # Mutations for cars
    # Add a car - id, year, make, model, price, and personId are required
    addCar(id: ID!, year: String!, make: String!, model: String!, price: String!, personId: ID!): Car
    # Update a car - id is required, year, make, model, price, and personId are optional
    updateCar(id: ID!, year: String, make: String, model: String, price: String, personId: ID): Car
    # Delete a car - id is required
    deleteCar(id: ID!): Car
  }
`;

const resolvers = {
  Query: {
    // Queries for people
    // Get all people
    people: () => people,
    // Get a person by id
    person: (_, args) => {
      const person = people.find((person) => person.id === args.id);

      if (!person) throw new Error('Person not found');

      return person;
    },

    // Queries for cars
    // Get all cars
    cars: () => cars,
    // Get a car by id
    car: (_, args) => {
      const car = cars.find((car) => car.id === args.id);

      if (!car) throw new Error('Car not found');

      return car;
    },
    // Get all cars by person id
    carsByPersonId: (_, args) => {
      const carsByPersonId = cars.filter((car) => car.personId === args.personId);

      if (!carsByPersonId) throw new Error('Cars not found');

      return carsByPersonId;
    },
  },
  Mutation: {
    // Mutations for people
    // Add a person
    addPerson: (_, args) => {
      const person = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };

      people.push(person);

      return person;
    },
    // Update a person
    updatePerson: (_, args) => {
      const person = people.find((person) => person.id === args.id);

      if (!person) throw new Error('Person not found');

      if (args.firstName) person.firstName = args.firstName;
      if (args.lastName) person.lastName = args.lastName;

      return person;
    },
    // Delete a person
    deletePerson: (_, args) => {
      const person = people.find((person) => person.id === args.id);

      if (!person) throw new Error('Person not found');

      people.splice(people.indexOf(person), 1);

      return person;
    },

    // Mutations for cars
    // Add a car
    addCar: (_, args) => {
      const person = people.find((person) => person.id === args.personId);

      if (!person) throw new Error('Person not found');

      const car = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };

      cars.push(car);

      return car;
    },
    // Update a car
    updateCar: (_, args) => {
      const car = cars.find((car) => car.id === args.id);

      if (!car) throw new Error('Car not found');

      if (args.year) car.year = args.year;
      if (args.make) car.make = args.make;
      if (args.model) car.model = args.model;
      if (args.price) car.price = args.price;
      if (args.personId) {
        const person = people.find((person) => person.id === args.personId);

        if (!person) throw new Error('Person not found');

        car.personId = args.personId;
      }

      return car;
    },
    // Delete a car
    deleteCar: (_, args) => {
      const car = cars.find((car) => car.id === args.id);

      if (!car) throw new Error('Car not found');

      cars.splice(cars.indexOf(car), 1);

      return car;
    },
  },
};

export { typeDefs, resolvers };
