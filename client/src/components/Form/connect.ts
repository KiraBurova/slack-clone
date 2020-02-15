import { connect } from 'react-redux'
import { registerUserAction, loginUserAction } from '../../redux/actions';

import FormComponent from './Form';

const mapDispatchToProps = { registerUserAction, loginUserAction };

export default connect(
    null,
    mapDispatchToProps
)(FormComponent)