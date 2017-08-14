import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setModuleParameter
} from 'store/reducers/patch';

import Parameter from './Parameter';

function mapStateToProps (state, props) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    setModuleParameter: bindActionCreators(setModuleParameter, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Parameter);

