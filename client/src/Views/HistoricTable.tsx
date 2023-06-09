import { FaSortUp, FaSortDown, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Container, Table, Form, FloatingLabel, Row } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import ReactPaginate from 'react-paginate';
import excluir from '../Icons/excluir.png';
import editar from '../Icons/editar.png';
import Swal from 'sweetalert2';
import axios from 'axios';
interface Calls {
  id: number;
  callType: string;
  callTitle: string;
  callDescription: string;
  callAttachments: number;
  callDateCreate: Date;
};

function HistoricTable() {
  const [data, setData] = useState<Calls[]>([]);
  const [show, setShow] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  //axios get
  useEffect(() => {
    async function fetchCalls() {
      axios.get('http://localhost:3001/call/historic')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchCalls()
  }, []);

  //delete
  async function handleDeleteCall(id: number) {
    try {
      await axios.delete(`http://localhost:3001/call/delete/${id}`);
      const updatedCalls = data.filter((call) => call.id !== id);
      setData(updatedCalls);
      Swal.fire({
        title: 'Deletar chamado',
        text: "Essa ação não pode ser revertida",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar'
      })
    }
    catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro!',
        text: 'Não foi possível excluir o chamado.',
      })
    }
  }

  //sort
  const [order, setOrder] = useState<"ASC" | "DSC">("ASC");
  const sorting = (col: keyof typeof data[0]) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 3;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  //animate
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent]);
  const reveal = (id: number) => {
    setShow(show === id ? null : id);
  }

  //search
  const filteredData = data.filter((item) =>
    item.callType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.callTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.callDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container className='px-2 mb-5'>
        <Container>
          {/* titulo */}
          <Row className='px-2 mb-5 mt-5'>
            <h1 className='text-center'>Histórico chamado</h1>
          </Row>
        </Container>
        <Container>
          <Row className=''>
            <Form.Control className='px-2 mb-2 pl-2'
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Row>

          <Table bordered hover>
            <thead>
              <tr>
                {/*cabeçalho tabela*/}
                <th onClick={() => sorting("id")} className="text-center">Id
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th onClick={() => sorting("callType")} className="text-center">Tipo chamado
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th onClick={() => sorting("callTitle")} className="text-center">Título chamado
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th onClick={() => sorting("callDescription")} className="text-center">Descrição chamado
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th onClick={() => sorting("callAttachments")} className="text-center">Anexo chamado
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th onClick={() => sorting("callDateCreate")} className="text-center">Criação chamado
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(pagesVisited, pagesVisited + itemsPerPage).map((data) => {
                return (
                  <tr key={data.id}>
                    {/*corpo tabela*/}
                    <td className="text-center">
                      {/*animate*/}
                      <strong className="dropdown-label" onClick={() => reveal(data.id)}>{data.id}</strong>
                    </td>
                    <td className="text-center">{data.callType}</td>
                    <td className="text-center">{data.callTitle}</td>
                    <td className="text-center">{data.callDescription}</td>
                    <td className="text-center">{data.callAttachments}</td>
                    <td className='text-center'>{new Date(data.callDateCreate).toLocaleDateString('en-GB')}</td>
                    <td className='text-center'>
                      <img style={{ width: '25px' }} src={editar} alt='Editar' />
                      <img style={{ width: '35px' }} src={excluir} alt='Excluir' onClick={() => handleDeleteCall(data.id)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/*pagination*/}
            {data.length > itemsPerPage && (
              <ReactPaginate
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination right'}
                activeClassName={'active'}
              />
            )}
          </Table>
          {/*animate*/}
          {data.map((item) => {
            return (
              <div key={item.id} ref={parent}>
                {
                  show === item.id && (
                    <FloatingLabel controlId="floatingLabel" label="Assunto">
                      <Form.Control type="text" defaultValue={item.callDescription} disabled />
                    </FloatingLabel>
                  )
                }
              </div>
            )
          })}
        </Container>
      </Container>
    </>
  )
}

export default HistoricTable;
