import { logout } from '../../actions/authActions'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { NavLink } from 'reactstrap'

export const Logout = ({ logout }) => {
    return (
        <Fragment>
            <NavLink onClick={logout} href="#">
                Logout
            </NavLink>
        </Fragment>
    )
}

export default connect(null, { logout })(Logout)