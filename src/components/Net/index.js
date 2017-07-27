import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Net from './Net';

function mapStateToProps (state, props) {
  return Object.assign({}, state, props);
}

function mapDispatchToProps (dispatch) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Net);
