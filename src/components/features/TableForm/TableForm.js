import { Form, Button, Col, Row } from "react-bootstrap";

const TableForm = () => {
    return (
        <Form className='d-flex justify-content-start m-2'>
            <Form.Group as={Row} style={{ maxWidth: '300px' }}>
            <h1 className='mb-4'>Table</h1>
                <Form.Label column sm='3'>
                    <span className='fw-bold'>Status:</span>
                </Form.Label>
                <Col sm='9' className='mb-3'>
                    <Form.Select size='md'>
                        <option value='free'>Free</option>
                        <option value='reserved'>Reserved</option>
                        <option value='busy'>Busy</option>
                        <option value='cleaning'>Cleaning</option>
                    </Form.Select>
                </Col>
                <Form.Label column sm='3'>
                    <span className='fw-bold'>People:</span>
                </Form.Label>
                <Col sm='9' className='d-flex mb-3'>
                    <Form.Control className='text-center' style={{ maxWidth: '50px' }} />
                        <span className='mx-1 my-auto' style={{ fontSize: '20px' }}>/</span>
                    <Form.Control className='text-center' style={{ maxWidth: '50px' }} />
                </Col>
                <Form.Label column sm='3'>
                    <span className='fw-bold'>Bill:</span>
                </Form.Label>
                <Col sm='9' className='d-flex mb-4 align-items-center'>
                    <span className='mx-1 my-auto' style={{ fontSize: '18px' }}>$</span>
                    <Form.Control className='text-center' style={{ maxWidth: '50px' }} />
                </Col>
                <Col sm='12'>
                    <Button variant='primary' type='submit'>Update</Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default TableForm;