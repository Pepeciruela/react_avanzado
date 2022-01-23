import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvertLoad } from '../../../store/selectors';
import { deleteAd, loadAdvert } from '../../../store/actions';

export const AdvertPage= ({advert, loadAdvert, advertDelete, load}) => {

  const {advertId} = useParams();
  console.log('soy advertid', advertId)

  useEffect(()=>{
    loadAdvert(advertId);
  },[loadAdvert, advertId])
  
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
