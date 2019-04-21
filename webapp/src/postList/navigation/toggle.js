import { connect } from 'react-redux';
import { togglePostList } from '../actions';
import MenuItem from '../../components/menuItem/view';

const mapStateToProps = (state) => ({
  isExpanded: state.postList.isExpanded,
  label: 'List'
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(togglePostList())
});

const ToggleView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);

export default ToggleView;
