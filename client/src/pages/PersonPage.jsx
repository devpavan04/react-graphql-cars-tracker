import { Page, Text, Divider, Loading, Spacer } from '@geist-ui/core';
import { useQuery } from '@apollo/client';
import { PersonCard } from '../components';
import { GET_PERSON_BY_ID } from '../gql';
import { useParams } from 'react-router';

export const PersonPage = () => {
  const { personID } = useParams();

  const {
    loading,
    error,
    data: person,
  } = useQuery(GET_PERSON_BY_ID, {
    variables: { personID },
  });

  if (loading) return <Loading />;

  if (error) return <Text>Error loading person</Text>;

  return (
    <Page style={{ maxWidth: '1280px' }}>
      <Text style={{ textTransform: 'capitalize', textAlign: 'center' }} h2>
        {person.person.firstName} {person.person.lastName}
      </Text>
      <Divider />
      <Spacer h={2} />
      <PersonCard person={person.person} disableLink defaultTab='Cars' />
    </Page>
  );
};
