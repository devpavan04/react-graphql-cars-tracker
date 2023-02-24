import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Input, Button, Loading, Select, Text, useToasts, Fieldset, Spinner } from '@geist-ui/core';
import { Edit, Trash2, User, ChevronRight, List } from '@geist-ui/icons';
import { Link } from 'react-router-dom';
import { UPDATE_PERSON, GET_PEOPLE, DELETE_CAR, DELETE_PERSON, GET_CARS_BY_PERSON_ID, UPDATE_CAR } from '../gql';

export const PersonCard = ({ person, disableLink, defaultTab }) => {
  const { id, firstName, lastName } = person;

  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');

  const [editedYear, setEditedYear] = useState('');
  const [editedMake, setEditedMake] = useState('');
  const [editedModel, setEditedModel] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedPersonId, setEditedPersonId] = useState('');

  const { setToast } = useToasts({ placement: 'topRight' });

  const { data: peopleData, loading: loadingPeopleData } = useQuery(GET_PEOPLE);

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
      delay: 1000,
    });

    // send user back to home page after 3 seconds
    if (disableLink) {
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
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

  const handleUpdatePerson = (personID) => {
    updatePerson({
      variables: { personID, firstName: editedFirstName, lastName: editedLastName },
      update: (cache, { data: { updatePerson } }) => {
        const { people } = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: people.map((person) => (person.id === updatePerson.id ? updatePerson : person)) },
        });
      },
    });

    setToast({
      text: 'Person updated successfully!',
      type: 'success',
      delay: 3000,
    });
  };

  const handleUpdateCar = (carID) => {
    updateCar({
      variables: {
        carID,
        year: editedYear,
        make: editedMake,
        model: editedModel,
        price: editedPrice,
        personID: editedPersonId,
      },
      update: (cache, { data: { updateCar } }) => {
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
          data: { carsByPersonId: carsByPersonId.map((car) => (car.id === updateCar.id ? updateCar : car)) },
        });
      },
    });

    setToast({
      text: 'Car updated successfully!',
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
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginTop: '3rem',
                      }}
                    >
                      <Input
                        value={editedYear}
                        label='Year'
                        placeholder={car.year}
                        type='secondary'
                        clearable
                        required
                        onChange={(e) => setEditedYear(e.target.value)}
                      />
                      <Input
                        value={editedMake}
                        label='Make'
                        placeholder={car.make}
                        type='secondary'
                        clearable
                        required
                        onChange={(e) => setEditedMake(e.target.value)}
                      />
                      <Input
                        value={editedModel}
                        label='Model'
                        placeholder={car.model}
                        type='secondary'
                        clearable
                        required
                        onChange={(e) => setEditedModel(e.target.value)}
                      />
                      <Input
                        value={editedPrice}
                        label='Price'
                        placeholder={`$${car.price}`}
                        type='secondary'
                        clearable
                        required
                        onChange={(e) => setEditedPrice(e.target.value)}
                      />
                      <Select
                        value={editedPersonId}
                        placeholder='Select a person'
                        type='secondary'
                        style={{ borderColor: '#000' }}
                        onChange={(val) => setEditedPersonId(val)}
                      >
                        {loadingPeopleData ? (
                          <Loading />
                        ) : (
                          [...peopleData?.people].reverse().map((person) => (
                            <Select.Option key={person.id} value={person.id}>
                              {person.firstName} {person.lastName}
                            </Select.Option>
                          ))
                        )}
                      </Select>
                      <Button auto type='secondary-light' shadow onClick={() => handleUpdateCar(car.id)}>
                        Update Car
                      </Button>
                    </div>
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
                    <Button auto type='error-light' shadow onClick={() => handleDeleteCar(car.id)}>
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
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}
        >
          <Input
            value={editedFirstName}
            label='First Name'
            placeholder={firstName}
            type='secondary'
            clearable
            onChange={(e) => setEditedFirstName(e.target.value)}
          />
          <Input
            value={editedLastName}
            label='Last Name'
            placeholder={lastName}
            type='secondary'
            clearable
            onChange={(e) => setEditedLastName(e.target.value)}
          />
          <Button auto type='secondary-light' shadow onClick={() => handleUpdatePerson(id)}>
            Update Person
          </Button>
        </div>
      </Fieldset>
      <Fieldset label='Delete'>
        <Fieldset.Title style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Trash2 />
          Are you sure you want to delete this person?
        </Fieldset.Title>
        <Button auto type='error-light' shadow onClick={() => handleDeletePerson(id)}>
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
