import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectLetFrom,
  selectLetTo,
  unselectLetFrom,
  unselectLetTo,
  connectLets
} from 'store/reducers/patch';

import Let from './Let';

function mapStateToProps (state, props) {
  const selectedLetFrom = state.patch.selectedLetFrom || {};
  const {
    name,
    moduleId
  } = selectedLetFrom;

  return {
    selectedLetFrom,
    isSelected: name === props.name && moduleId === props.moduleId
  };
}

function mapDispatchToProps (dispatch) {
  return {
    selectLetFrom: bindActionCreators(selectLetFrom, dispatch),
    selectLetTo: bindActionCreators(selectLetTo, dispatch),
    unselectLetFrom: bindActionCreators(unselectLetFrom, dispatch),
    unselectLetTo: bindActionCreators(unselectLetTo, dispatch),
    connectLets: bindActionCreators(connectLets, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Let);
