import { useQuery, useMutation } from '@apollo/client';
import { Input, Button, Text, useToasts, Fieldset, Spinner } from '@geist-ui/core';
import { Edit, Trash2, User, ChevronRight, List, Truck } from '@geist-ui/icons';
import { Link } from 'react-router-dom';
import { UPDATE_PERSON, GET_PEOPLE, DELETE_CAR, DELETE_PERSON, GET_CARS_BY_PERSON_ID, UPDATE_CAR } from '../gql';

export const PersonCard = ({ person, disableLink, defaultTab }) => {
  const { id, firstName, lastName } = person;

  const { setToast } = useToasts({ placement: 'topRight' });

  const { data: carsData, loading: carsDataLoading } = useQuery(GET_CARS_BY_PERSON_ID, {
    variables: { personID: id },
  });

  const [updatePerson, { data: updatePersonData, error: updatePersonError }] = useMutation(UPDATE_PERSON);
  const [deletePerson, { data: deletePersonData, error: deletePersonError }] = useMutation(DELETE_PERSON);
  const [updateCar, { data: updateCarData, error: updateCarError }] = useMutation(UPDATE_CAR);
  const [deleteCar, { data: deleteCarData, error: deleteCarError }] = useMutation(DELETE_CAR);

  const handleDeletePerson = (personID) => {
    deletePerson({
      variables: { personID },
      update: (cache, { data: { deletePerson } }) => {
        const { people } = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: people.filter((person) => person.id !== deletePerson.id) },
        });
      },
    });

    setToast({
      text: 'Person deleted successfully!',
      type: 'success',
      delay: 3000,
    });
  };

  const handleDeleteCar = (carID) => {
    deleteCar({
      variables: { carID },
      update: (cache, { data: { deleteCar } }) => {
        const { carsByPersonId } = cache.readQuery({
          query: GET_CARS_BY_PERSON_ID,
          variables: {
            personID: id,
          },
        });
        cache.writeQuery({
          query: GET_CARS_BY_PERSON_ID,
          variables: {
            personID: id,
          },
          data: { carsByPersonId: carsByPersonId.filter((car) => car.id !== deleteCar.id) },
        });
      },
    });

    setToast({
      text: 'Car deleted successfully!',
      type: 'success',
      delay: 3000,
    });
  };

  return (
    <Fieldset.Group value={defaultTab}>
      <Fieldset label='Person'>
        <Fieldset.Title style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <User />
          {firstName} {lastName}
        </Fieldset.Title>
      </Fieldset>
      <Fieldset label='Cars'>
        <Fieldset.Title style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <List />
          Cars
        </Fieldset.Title>
        {carsDataLoading ? (
          <Spinner />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {carsData.carsByPersonId.length !== 0 ? (
              carsData.carsByPersonId.map((car) => (
                <Fieldset.Group key={car.id} defaultValue='Car' value='Car'>
                  <Fieldset label='Car'>
                    <Fieldset.Title
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
                    >
                      {car.make}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ChevronRight />
                        Year {car.year}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ChevronRight />
                        By {car.model}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ChevronRight />
                        Price ${car.price}
                      </div>
                    </Fieldset.Title>
                  </Fieldset>
                  <Fieldset label='Update'>
                    <Fieldset.Title
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Edit />
                        Update Car
                      </div>
                    </Fieldset.Title>
                  </Fieldset>
                  <Fieldset label='Delete'>
                    <Fieldset.Title
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trash2 />
                        Are you sure you want to delete this car?
                      </div>
                    </Fieldset.Title>
                    <Button auto type='error-light' onClick={() => handleDeleteCar(car.id)}>
                      Delete
                    </Button>
                  </Fieldset>
                </Fieldset.Group>
              ))
            ) : (
              <Text>No cars to show.</Text>
            )}
          </div>
        )}
      </Fieldset>
      <Fieldset label='Update'>
        <Fieldset.Title style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Edit />
          Update details
        </Fieldset.Title>
      </Fieldset>
      <Fieldset label='Delete'>
        <Fieldset.Title style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Trash2 />
          Are you sure you want to delete this person?
        </Fieldset.Title>
        <Button auto type='error-light' onClick={() => handleDeletePerson(id)}>
          Delete
        </Button>
      </Fieldset>
      {!disableLink && (
        <Fieldset.Footer>
          <Link to={`/people/${id}`}>
            <Text type='success' b>
              Learn More
            </Text>
          </Link>
        </Fieldset.Footer>
      )}
    </Fieldset.Group>
  );
};
