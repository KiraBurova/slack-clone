import { connect } from 'react-redux'
import { actions } from '../../redux/actions';

import FormComponent from './Form';

const mapStateToProps = (state: any) => ({
    item: 'state.item'
})

const mapDispatchToProps = (dispatch: any) => ({
    // Let's just assume you pass user details to your action
    registerUser: (user: any) => dispatch(actions.registerUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent)