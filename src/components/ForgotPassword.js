import React, {useRef,useState} from 'react'
import {Link} from 'react-router-dom'
import {Card, Form, Button,Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
export default function ForgotPassword() {
    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message, setMessage] = useState('');
    // const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage('Check your Inbox for further notifications')
            // navigate("/login")
        } catch{
            setError('Failed to reset Password.') 
        }
        setLoading(false)

    }
  return (
    <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">
                Reset Password
            </h2>
            {error && <Alert variant ="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                
                <Button disabled={loading} type="submit" className="w-100 mt-3">Reset Password</Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to="/login" >Login</Link>
            </div>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Need an Account ? <Link to="/signup">Sign Up</Link>
    </div>
    </>
  )
}
