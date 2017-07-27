import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  refresh
} from 'store/reducers/patch';

import Patcher from './Patcher';

function mapStateToProps (state, props) {
  return Object.assign({}, state, props);
}

function mapDispatchToProps (dispatch) {
  return {
    refresh: bindActionCreators(refresh, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Patcher);
