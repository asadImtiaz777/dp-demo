import React from 'react';
import { connect } from 'react-redux';
import ScreenWraper from '../../components/ScreenWraper/ScreenWraper';

const Dashboard = (props) => {
    return(
        <ScreenWraper title="Dashboard">
            <h1>Welcome {props?.user.name} TO DP World!</h1>
        </ScreenWraper>
    );

}
const mapStateToProps = state => {
    return {
        user:state.auth.user
    }
  }
export default connect(mapStateToProps)(Dashboard);