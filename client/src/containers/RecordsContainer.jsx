import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../gql';
import { Text, Loading, Divider } from '@geist-ui/core';
import { PersonCard } from '../components';

export const RecordsContainer = () => {
  const { loading, error, data: people } = useQuery(GET_PEOPLE);

  if (loading) return <Loading />;

  if (error) return <Text>Error loading people</Text>;

  return (
    <div style={{ padding: '3rem 0' }}>
      <Divider>
        <Text h3>Records</Text>
      </Divider>

      {people && people.people.length === 0 ? (
        <Text style={{ marginTop: '3rem', textAlign: 'center' }}>No records to show</Text>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
          {people &&
            [...people.people]
              .reverse()
              .map((person) => <PersonCard key={person.id} person={person} defaultTab='Person' />)}
        </div>
      )}
    </div>
  );
};
