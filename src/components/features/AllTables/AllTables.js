import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';

const AllTables = () => {

    const tables = useSelector(getAllTables);

    if (tables.length === 0)
    return (
      <div className='text-center'>
        <Spinner animation="border" variant="primary" />
      </div>
    );

    return (
        <ListGroup variant="flush">
            {tables.map( table =>
                <ListGroup.Item key={table.id} className="py-3 d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <h3>Table: {table.id}</h3>
                        <span className='mx-2'></span>
                        <span><b>Status:</b> {table.status}</span>
                    </div>
                    <Button as={Link} to={"/table/" + table.id}>Show more</Button>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default AllTables;