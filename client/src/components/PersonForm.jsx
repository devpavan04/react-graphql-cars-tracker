import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { Input, Button, Text, useToasts, Divider } from '@geist-ui/core';
import { ADD_PERSON, GET_PEOPLE } from '../gql';

export const PersonForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { setToast } = useToasts({ placement: 'topRight' });

  const [addPerson, { data, error }] = useMutation(ADD_PERSON);

  const handleAddPerson = () => {
    if (!firstName || !lastName) {
      return setToast({ text: 'Please fill in all the fields!', type: 'error', delay: 3000 });
    }

    addPerson({
      variables: { personID: uuidv4(), firstName, lastName },
      update: (cache, { data: { addPerson } }) => {
        const { people } = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({ query: GET_PEOPLE, data: { people: people.concat([addPerson]) } });
      },
    });

    setToast({ text: 'Person added successfully!', type: 'success', delay: 3000 });

    setFirstName('');
    setLastName('');
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <Divider>
        <Text h3>Add Person</Text>
      </Divider>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
        <Input
          value={firstName}
          label='First Name'
          placeholder='First Name'
          type='secondary'
          clearable
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          value={lastName}
          label='Last Name'
          placeholder='Last Name'
          type='secondary'
          clearable
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button auto type='secondary-light' onClick={handleAddPerson}>
          Add Person
        </Button>
      </div>
    </div>
  );
};
