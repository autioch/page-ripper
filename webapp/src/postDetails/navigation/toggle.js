import { connect } from 'react-redux';
import { togglePostDetails } from '../actions';
import MenuItem from '../../components/menuItem/view';

const mapStateToProps = (state) => ({
  isExpanded: state.postDetails.isExpanded,
  label: 'Details'
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(togglePostDetails())
});

const ToggleView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);

export default ToggleView;
