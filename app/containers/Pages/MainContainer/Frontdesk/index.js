import React,{useEffect,useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { FrontDeskComponent } from 'enl-components';
import { getFrontedsk,getSearchFrontedsk } from 'enl-redux/actions/FrontDeskAction';
import { useDispatch, useSelector, connect } from 'react-redux';

function Frontdesk() {
    const title = brand.name + ' - Frontdesk';
    const description = brand.desc;

    const dispatch = useDispatch();
    const selectState = useSelector((state) => state.toJS());
    const { frontDeskReducer,dashboardReducer } = selectState;
    const { front_desk_list } = frontDeskReducer;
    const [prifixUrl,setPrifixUrl]=useState(null);
    // const {receptionist_images_prefix_url}=dashboardReducer.imagesOrDocs

    const [resptionList,setResptionList]=useState([]);
    
    useEffect(() => {
        dispatch(getFrontedsk());
        if(front_desk_list.length >0){
            setResptionList(front_desk_list);
        }
        if(dashboardReducer.imagesOrDocs!=null){
            let {receptionist_images_prefix_url}=dashboardReducer.imagesOrDocs
            setPrifixUrl(receptionist_images_prefix_url)
        }
    },[dashboardReducer])

    const getFrontDesk=(search)=>{
        dispatch(getSearchFrontedsk(search));
    }

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
            <Grid
                container
                alignItems="flex-start"
                justify="flex-start"
                direction="row"
                spacing={3}
            >
                <Grid item md={12} xs={12}>
                    <FrontDeskComponent getFrontDesk={getFrontDesk} avatar_url={prifixUrl} resptionList={front_desk_list}  />
                </Grid>
            </Grid>
        </div>
    );
}

export default Frontdesk;
