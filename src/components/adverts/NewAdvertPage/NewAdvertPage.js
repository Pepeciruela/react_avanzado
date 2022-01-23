import React from 'react';
import T from 'prop-types';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { useDispatch } from 'react-redux';
import { createNewAdvert } from '../../../store/actions';

function NewAdvertPage({ history }) {

  const dispatch = useDispatch();

  const handleSubmit = newAdvert => {
    dispatch(createNewAdvert(newAdvert))
  };


  return (
    <Layout>
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({
    push: T.func.isRequired,
  }).isRequired,
};

export default NewAdvertPage;
