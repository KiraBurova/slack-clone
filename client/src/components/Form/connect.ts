import { connect } from 'react-redux'
import { actions } from '../../redux/actions';

import FormComponent from './Form';

const mapStateToProps = (state: any/*, ownProps*/) => { }

const mapDispatchToProps = { actions }

console.log(actions)

export default connect(
    null,
    mapDispatchToProps
)(FormComponent)