import { useState, useEffect, useCallback } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from "../../actions/errorActions";


const LoginModal = ({ isAuthenticated, error, login, clearErrors }) => {

    const [modal, setModal] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState(null)

    const toggle = useCallback(() => {
        clearErrors()
        setModal(!modal)
    }, [clearErrors, modal])

    const onChangeEmail = e => setEmail(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)

    const onSubmit = e => {
        e.preventDefault()

        const user = { email, password }
        login(user)
    }

    useEffect (() => {
        if (error.id === 'LOGIN_FAIL') setMsg(error.msg.msg)
        else setMsg(null)

        if (modal) if (isAuthenticated) toggle()
    }, [error, toggle, isAuthenticated, modal])


    return (
        <div>
            <NavLink onClick={toggle} href="#">
                Login
            </NavLink>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter your email" onChange={onChangeEmail}/>

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password" onChange={onChangePassword} />

                            <Button color="dark" style={{ marginTop: '2rem' }} block onClick={onSubmit}>Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
