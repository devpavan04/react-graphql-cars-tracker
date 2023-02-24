import { CarForm, PersonForm } from '../components';

export const FormsContainer = () => {
  return (
    <div style={{ padding: '1rem 0 2rem' }}>
      <PersonForm />
      <CarForm />
    </div>
  );
};
