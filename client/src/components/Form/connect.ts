import { connect } from 'react-redux';
import { registerUserAction, loginUserAction } from '../../redux/actions';

import FormContainer from './FormContainer';

const mapDispatchToProps = { registerUserAction, loginUserAction };

export default connect(null, mapDispatchToProps)(FormContainer);
