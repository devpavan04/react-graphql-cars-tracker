import { useParams } from 'react-router';

export const PersonPage = () => {
  const { personID } = useParams();

  return (
    <div>
      <h1>Person Page</h1>
    </div>
  );
};
