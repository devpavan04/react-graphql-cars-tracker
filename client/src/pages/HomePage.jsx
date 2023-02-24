import { Page, Text, Divider } from '@geist-ui/core';
import { FormsContainer, RecordsContainer } from '../containers';

export const HomePage = () => {
  return (
    <Page style={{ maxWidth: '1280px' }}>
      <Text style={{ textTransform: 'capitalize', textAlign: 'center' }} h2>
        People Cars Tracker
      </Text>
      <Divider />
      <FormsContainer />
      <Divider />
      <RecordsContainer />
    </Page>
  );
};
