import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectModule,
  unselectModule,
  setModulePosition
} from 'store/reducers/patch';

import Module from './Module';

function mapStateToProps (state, props) {
  return {
    isSelected: state.patch.selectedModule === props.moduleDef.id,
    selectable: !!!state.patch.selectedLet
  };
}

function mapDispatchToProps (dispatch) {
  return {
    selectModule: bindActionCreators(selectModule, dispatch),
    unselectModule: bindActionCreators(unselectModule, dispatch),
    setModulePosition: bindActionCreators(setModulePosition, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Module);

