import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import TopNav from '../components/topnav/TopNav';
import Map from '../components/Map/Map';
import './main-layout.scss';

const MainLayout = () => {
    const properties = [
        'the_geom',
        'objectid',
        'id',
        'name',
        'country',
        'censusname',
        'state_loca',
        'lgd_statec',
        'censuscode',
        'censusco_1',
        'censusco_2',
        'level_2011',
        'tru_2011',
        'no_hh_2011',
        'tot_p_2011',
        'avghhsz_cy',
        'premiumdat',
        'st_areasha',
        'st_lengths',
    ];

    return (
        <>
            <Sidebar style={{ zIndex: 9999 }} />
            <div className="main">
                <div className="main__content">
                    <TopNav style={{ zIndex: 9999 }} />
                    <Map selectedProperties={properties} style={{ zIndex: 0 }} />
                   
                </div>
            </div>
            
        </>
    )
}

export default MainLayout;
