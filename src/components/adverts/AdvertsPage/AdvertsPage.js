import React, { useEffect } from 'react';
//import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { defaultFilters, filterAdverts } from './filters';
import { useDispatch, useSelector } from 'react-redux';
import { advertsLoaded, loadAdverts } from '../../../store/actions';
import { getAllAdverts } from '../../../store/selectors';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  
  const [filters, setFilters] = React.useState(getFilters);

  const dispatch = useDispatch();
  const adverts = useSelector(getAllAdverts);
  console.log(adverts);

  useEffect(() => {
    dispatch(loadAdverts());
  },[dispatch])

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  const filteredAdverts = filterAdverts(adverts, filters);

  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
