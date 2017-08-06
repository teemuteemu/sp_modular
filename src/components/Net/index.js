import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  disconnectLets
} from 'store/reducers/patch';

import Net from './Net';

function mapStateToProps (state, props) {
  return Object.assign({}, state, props);
}

function mapDispatchToProps (dispatch) {
  return {
    disconnectLets: bindActionCreators(disconnectLets, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Net);
