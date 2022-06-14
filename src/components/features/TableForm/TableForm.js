import { Form, Button, Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTableRequest, getTableById } from "../../../redux/tablesRedux";
import { useState } from "react";

const TableForm = () => {

    const { id } = useParams();  
    const table = useSelector(state => getTableById(state, parseInt(id)));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status, setStatus] = useState(table.status);
    const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
    const [bill, setBill] = useState(table.bill);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateTableRequest({ id, status, peopleAmount: parseInt(peopleAmount), maxPeopleAmount: parseInt(maxPeopleAmount), bill: parseInt(bill) }));
        navigate('/');
    }

    const validationStatus = status => {
        if(status === 'Busy'){
            setBill(0);
            setStatus(status);
        } else if(status === 'Cleaning' || status === 'Free') {
            setPeopleAmount(0);
            setBill(0);
            setStatus(status);
        } else {
            setStatus(status);
        }
    }

    const validationPeopleAmount = value => {
        if (value <= 0){
          setPeopleAmount(0);
        } else if (value > maxPeopleAmount) {
          setPeopleAmount(0);
        } else {
          setPeopleAmount(value);
        }
      };
      
    const validationMaxPeopleAmount = value => {
        if (peopleAmount >= value) {
            setPeopleAmount(value);
            setMaxPeopleAmount(value);
        } else if (value > 10){
            setMaxPeopleAmount(10);
        } else {
          setMaxPeopleAmount(value);
        }
    };

    return (
        <Form key={table.id} className='d-flex justify-content-start m-2' onSubmit={handleSubmit}>
            <Form.Group as={Row} style={{ maxWidth: '300px' }}>
            <h1 className='mb-4'>Table {table.id}</h1>
                <Form.Label column sm='3'>
                    <span className='fw-bold'>Status:</span>
                </Form.Label>
                <Col sm='9' className='mb-3'>
                    <Form.Select size='md' value={status} onChange={e => validationStatus(e.target.value)}>
                        <option value='Free'>Free</option>
                        <option value='Reserved'>Reserved</option>
                        <option value='Busy'>Busy</option>
                        <option value='Cleaning'>Cleaning</option>
                    </Form.Select>
                </Col>
                <Form.Label column sm='3'>
                    <span className='fw-bold'>People:</span>
                </Form.Label>
                <Col sm='9' className='d-flex mb-3'>
                    <Form.Control value={peopleAmount} onChange={e => validationPeopleAmount(e.target.value)} className='text-center' style={{ maxWidth: '50px' }} />
                        <span className='mx-1 my-auto' style={{ fontSize: '20px' }}>/</span>
                    <Form.Control value={maxPeopleAmount} onChange={e => validationMaxPeopleAmount(e.target.value)} className='text-center' style={{ maxWidth: '50px' }} />
                </Col>
                <Form.Label column sm='3'>
                    <span className='fw-bold'>Bill:</span>
                </Form.Label>
                <Col sm='9' className='d-flex mb-4 align-items-center'>
                    <span className='mx-1 my-auto' style={{ fontSize: '18px' }}>$</span>
                    <Form.Control value={bill} onChange={e => setBill(e.target.value)} className='text-center' style={{ maxWidth: '50px' }} />
                </Col>
                <Col sm='12'>
                    <Button variant='primary' type='submit'>Update</Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default TableForm;