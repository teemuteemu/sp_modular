import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectLet,
  unselectLet
} from 'store/reducers/patch';

import Let from './Let';

function mapStateToProps (state, props) {
  return Object.assign({}, state, props);
}

function mapDispatchToProps (dispatch) {
  return {
    selectLet: bindActionCreators(selectLet, dispatch),
    unselectLet: bindActionCreators(unselectLet, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Let);
