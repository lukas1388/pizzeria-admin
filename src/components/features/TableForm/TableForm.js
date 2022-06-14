import { Form, Button, Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTableRequest, getTableById } from "../../../redux/tablesRedux";
import { useState, useEffect } from "react";

const TableForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();  
    const table = useSelector(state => getTableById(state, parseInt(id)));

    const [status, setStatus] = useState('Busy');
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
    const [bill, setBill] = useState(0);

    // When table loads -> update local state
    useEffect(() => {
        if(table) {
            setStatus(table.status);
            setPeopleAmount(table.peopleAmount);
            setMaxPeopleAmount(table.maxPeopleAmount);
            setBill(table.bill);
        }
    }, [table]);

    // If status changes busy, 
    useEffect(() => {
        if(status === 'Busy'){
            setBill(0);
        } else if(status === 'Cleaning' || status === 'Free') {
            setPeopleAmount(0);
            setBill(0);
        } else {
            setStatus(table.status);
            setPeopleAmount(table.peopleAmount);
            setMaxPeopleAmount(table.maxPeopleAmount);
            setBill(table.bill);
        }
    }, [status]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateTableRequest({ id, status, peopleAmount: parseInt(peopleAmount), maxPeopleAmount: parseInt(maxPeopleAmount), bill: parseInt(bill) }));
        navigate('/');
    }

    const updatePeopleAmount = value => {
        if (value <= 0){
          setPeopleAmount(0);
        } else if (value > maxPeopleAmount) {
          setPeopleAmount(0);
        } else {
          setPeopleAmount(value);
        }
      };
      
    const updateMaxPeopleAmount = value => {
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
                    <Form.Select size='md' value={status} onChange={e => setStatus(e.target.value)}>
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
                    <Form.Control value={peopleAmount} onChange={e => updatePeopleAmount(e.target.value)} className='text-center' style={{ maxWidth: '50px' }} />
                        <span className='mx-1 my-auto' style={{ fontSize: '20px' }}>/</span>
                    <Form.Control value={maxPeopleAmount} onChange={e => updateMaxPeopleAmount(e.target.value)} className='text-center' style={{ maxWidth: '50px' }} />
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