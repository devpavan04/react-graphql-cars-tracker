import { Page, Text, Divider, Loading, Spacer, Button } from '@geist-ui/core';
import { ChevronLeftCircle } from '@geist-ui/icons';
import { Link } from 'react-router-dom';
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to='/'>
          <Button auto type='secondary-light' shadow icon={<ChevronLeftCircle />}>
            Back
          </Button>
        </Link>
        <Text style={{ textTransform: 'capitalize', textAlign: 'center' }} h2>
          {person.person.firstName} {person.person.lastName}
        </Text>
      </div>
      <Divider />
      <Spacer h={2} />
      <PersonCard person={person.person} disableLink defaultTab='Cars' />
    </Page>
  );
};
