import { useCallback, useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, NavLink, Alert } from "reactstrap"
import { connect } from "react-redux"
import { register } from '../../actions/authActions'
import { clearErrors } from "../../actions/errorActions"


const RegisterModal = ({ isAuthenticated, error, register, clearErrors }) => {

    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const toggle = useCallback(() => {
        clearErrors()
        setModal(!modal)
    }, [clearErrors, modal])


    const onChangeName = e => setName(e.target.value)
    const onChangeEmail = e => setEmail(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)


    const onSubmit = e => {
        e.preventDefault()

        const user = {name, email, password}
        register(user)
    }

    useEffect (() => {
        if (error.id === 'Registration failed!') {
            setMessage(error.msg.msg)
        } else setMessage(null)

        if (modal) {
            if (isAuthenticated) toggle()
        }
    }, [error, toggle, isAuthenticated, modal])

    
    return (
        <div>
            <NavLink onClick={toggle} href='#'>
                Register
            </NavLink>
            <Modal
                isOpen={modal}
                toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Register
                </ModalHeader>
                <ModalBody>
                    {message ? <Alert color="danger">{message}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input className="mt-2 mb-2" type="text" name='name' id="name" placeholder="Add your name" onChange={onChangeName}></Input>
                            
                            <Label for="email">Email</Label>
                            <Input className="mt-2 mb-2" type="email" name='email' id="email" placeholder="Add your email" onChange={onChangeEmail}></Input>
                            
                            <Label for="password">Password</Label>
                            <Input className="mt-2 mb-2" type="password" name='password' id="password" placeholder="Add your password" onChange={onChangePassword}></Input>
                            
                            <Button color="dark" style={{marginTop: '2rem', width:'100%'}} block >
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)
