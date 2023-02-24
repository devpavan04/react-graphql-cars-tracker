import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';
import { Input, Button, Text, Select, Loading, useToasts, Divider } from '@geist-ui/core';
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../gql';

export const CarForm = () => {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [personId, setPersonId] = useState('');

  const { setToast } = useToasts({ placement: 'topRight' });

  const { data: peopleData, loading: loadingPeopleData } = useQuery(GET_PEOPLE);

  const [addCar, { data, error }] = useMutation(ADD_CAR);

  const handleAddCar = () => {
    if (!year || !make || !model || !price || !personId) {
      return setToast({ text: 'Please fill in all the fields!', type: 'error', delay: 3000 });
    }

    addCar({
      variables: { carID: uuidv4(), year, make, model, price, personId },
      // update: (cache, { data: { addCar } }) => {
      //   const { cars } = cache.readQuery({ query: GET_CARS });
      //   cache.writeQuery({ query: GET_CARS, data: { cars: cars.concat([addCar]) } });
      // },
    });

    addCar({
      variables: { carID: uuidv4(), year, make, model, price, personId },
      update: (cache, { data: { addCar } }) => {
        const { cars } = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({ query: GET_CARS, data: { cars: cars.concat([addCar]) } });
      },
    });

    setToast({ text: 'Car added successfully!', type: 'success', delay: 3000 });

    setYear('');
    setMake('');
    setModel('');
    setPrice('');
    setPersonId('');
  };

  return (
    <div style={{ padding: '3rem 0 0' }}>
      <Divider>
        <Text h3>Add Car</Text>
      </Divider>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
        <Input
          label='Year'
          placeholder='Year'
          type='secondary'
          clearable
          required
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          label='Make'
          placeholder='Make'
          type='secondary'
          clearable
          required
          onChange={(e) => setMake(e.target.value)}
        />
        <Input
          label='Model'
          placeholder='Model'
          type='secondary'
          clearable
          required
          onChange={(e) => setModel(e.target.value)}
        />
        <Input
          label='Price'
          placeholder='$'
          type='secondary'
          clearable
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <Select
          placeholder='Select a Person'
          type='secondary'
          style={{ borderColor: '#000' }}
          onChange={(val) => setPersonId(val)}
        >
          {loadingPeopleData ? (
            <Loading />
          ) : (
            peopleData.people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))
          )}
        </Select>
        <Button auto type='secondary-light' onClick={handleAddCar}>
          Add Car
        </Button>
      </div>
    </div>
  );
};
