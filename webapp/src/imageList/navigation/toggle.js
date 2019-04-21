import { connect } from 'react-redux';
import { toggleImageList } from '../actions';
import MenuItem from '../../components/menuItem/view';

const mapStateToProps = (state) => ({
  isExpanded: state.imageList.isExpanded,
  label: 'Images'
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(toggleImageList())
});

const ToggleView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);

export default ToggleView;
