import { connect } from 'react-redux'
import { registerUserAction, loginUser } from '../../redux/actions';

import FormComponent from './Form';

const mapDispatchToProps = { registerUserAction, loginUser };

export default connect(
    null,
    mapDispatchToProps
)(FormComponent)