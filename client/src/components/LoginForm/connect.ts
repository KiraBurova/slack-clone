import { connect } from 'react-redux';
import { loginUserAction } from '../../redux/actions';

import LoginForm from './LoginForm';

const mapDispatchToProps = { loginUserAction };

export default connect(null, mapDispatchToProps)(LoginForm);
