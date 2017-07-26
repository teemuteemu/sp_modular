import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  refresh
} from 'store/reducers/patch';
import Patcher from './Patcher.js';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    refresh: bindActionCreators(refresh, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Patcher);
