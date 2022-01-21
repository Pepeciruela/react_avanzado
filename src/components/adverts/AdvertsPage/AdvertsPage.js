import React, { useEffect } from 'react';
//import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { getAdverts } from '../service';
import { defaultFilters, filterAdverts } from './filters';
//import useQuery from '../../../hooks/useQuery';
import { useDispatch, useSelector } from 'react-redux';
import { advertsLoaded, loadAdverts } from '../../../store/actions';
import { getAllAdverts } from '../../../store/selectors';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  //const { isLoading, error, data: adverts = [] } = useQuery(getAdverts);
  const [filters, setFilters] = React.useState(getFilters);

  const dispatch = useDispatch();
  const adverts = useSelector(getAllAdverts);

  useEffect(() => {
    dispatch(loadAdverts());
    //getAdverts().then(adverts => dispatch(advertsLoaded(adverts)))
  },[dispatch])

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  // if (error?.statusCode === 401) {
  //   return <Redirect to="/login" />;
  // }

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
