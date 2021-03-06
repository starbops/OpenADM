import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const PortStatusContainer = ({ portStatus, getPorts }) => (
  <div>
    <h2 onClick={() => getPorts()}>Port Status</h2>
    <pre>{JSON.stringify(portStatus, null, 2)}</pre>
  </div>
);

PortStatusContainer.propTypes = {
  portStatus: PropTypes.array,
  getPorts: PropTypes.func,
};

const mapStateToProps = state => ({
  portStatus: state.portStatus,
});

const mapDispatchToProps = dispatch => ({
  getPorts: () => dispatch({
    type: 'OTHER',
    payload: {
      url: 'port',
    },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PortStatusContainer);
