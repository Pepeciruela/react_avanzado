import React, { useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../service';
import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';
import { getAdvertLoad, getAdvertSelector, getUi } from '../../../store/selectors';
import { deleteAd, loadAdvert } from '../../../store/actions';

export const AdvertPage= ({advert, loadAdvert, advertDelete, load}) => {

  const {advertId} = useParams();
  console.log('soy advertid', advertId)

  useEffect(()=>{
    loadAdvert(advertId);
  },[loadAdvert, advertId])
  // const { advertId } = useParams();
  // const history = useHistory();
  // const getAdvertById = React.useCallback(
  //   () => getAdvert(advertId),
  //   [advertId],
  // );
  //const { isLoading, error, data: advert } = useQuery(getAdvertById);
  // const mutation = useMutation(deleteAdvert);
  // console.log('advertId', advertId.advertId);
  // const dispatch = useDispatch();
  //const advert = useSelector(getAdvertSelector);
  // console.log(advert);
  
  // const advert = useEffect(() => {
  //   dispatch(loadAdvert(advertId.advertId));
  // },[dispatch])

  // const handleDelete = () => {
  //   mutation.execute(advertId).then(() => history.push('/'));
  // };

  //const handleDelete = {}

  // if (error?.statusCode === 401 || mutation.error?.statusCode === 401) {
  //   return <Redirect to="/login" />;
  // }

  // if (error?.statusCode === 404) {
  //   return <Redirect to="/404" />;
  // }

  if(load){
    return(<h1>Delete advert</h1>)
  };

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={()=>advertDelete(advertId)} />}
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    advert:getAdvertLoad(state),
    load: getAdvertLoad(state),
  }
}
;
const mapDispatchToProps = (dispatch) => {
  return{
    loadAdvert: (advertId) => dispatch(loadAdvert(advertId)),
    advertDelete: (advertId) => dispatch(deleteAd(advertId)),
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(AdvertPage);
