import { connect } from 'react-redux'
import { actions } from '../../redux/actions';
import { User } from '../../type';

import FormComponent from './Form';

const mapStateToProps = (state: any) => ({
    item: 'state.item'
})

const mapDispatchToProps = (dispatch: any) => ({
    // Let's just assume you pass user details to your action
    registerUser: (user: User) => dispatch(actions.registerUser(user)),
    loginUser: (user: User) => dispatch(actions.loginUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent)