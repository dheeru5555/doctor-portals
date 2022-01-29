import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { SupportComponent } from 'enl-components';
import { useDispatch, useSelector, connect } from 'react-redux';
import { supportList } from 'enl-redux/actions/supportActions';

function Support() {
  const title = brand.name + ' - Support';
  const description = brand.desc;
  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.toJS());
  const { supportReducer } = selectState;
  const { ticket_list } = supportReducer;


  useEffect(() => {
    dispatch(supportList());
  }, []);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <SupportComponent key="1" ticket_list={ticket_list} />
    </div>
  );
}

export default Support;
