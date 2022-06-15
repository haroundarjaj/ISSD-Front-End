import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Breadcrumb, BreadcrumbItem, Container, Button } from 'reactstrap'
import PaginationComponent from '../../Components/PaginationComponent';
import axios from 'axios';
import { backendAPI } from '../../Config/apiUrl'


/* const rows = [
    'address 1', 'address 2', 'address 3', 'address 4', 'address 5', 'address 6', 'address 7', 'address 8', 'address 9',
    'address 10', 'address 11', 'address 12', 'address 13', 'address 14', 'address 15', 'address 16',
    'address 17', 'address 18', 'address 19', 'address 20', 'address 21', 'address 22', 'address 23',
    'address 24', 'address 25', 'address 26', 'address 27', 'address 28', 'address 29', 'address 30',
    'address 31', 'address 32', 'address 33', 'address 34', 'address 35', 'address 36', 'address 37',
    'address 1', 'address 2', 'address 3', 'address 4', 'address 5', 'address 6', 'address 7', 'address 8', 'address 9',
    'address 10', 'address 11', 'address 12', 'address 13', 'address 14', 'address 15', 'address 16',
    'address 17', 'address 18', 'address 19', 'address 20', 'address 21', 'address 22', 'address 23',
    'address 24', 'address 25', 'address 26', 'address 27', 'address 28', 'address 29', 'address 30',
    'address 31', 'address 32', 'address 33', 'address 34', 'address 35', 'address 36', 'address 37',
    'address 1', 'address 2', 'address 3', 'address 4', 'address 5', 'address 6', 'address 7', 'address 8', 'address 9',
    'address 10', 'address 11', 'address 12', 'address 13', 'address 14', 'address 15', 'address 16',
    'address 17', 'address 18', 'address 19', 'address 20', 'address 21', 'address 22', 'address 23',
    'address 24', 'address 25', 'address 26', 'address 27', 'address 28', 'address 29', 'address 30',
    'address 31', 'address 32', 'address 33', 'address 34', 'address 35', 'address 36', 'address 37'
]; */

let PageSize = 10;

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: '#1E1E2F !important',
    },
}))(Paper);

const SelectorPage = props => {
    const [direcciones, setDirecciones] = useState([])
    const [currentPage, setCurrentPage] = useState(null);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return direcciones.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, direcciones]);

    const emptyRows = () => {
        if (currentPage === Math.ceil(direcciones.length / PageSize)) {
            return PageSize - currentTableData.length;
        }
        return 0;
    }

    const handleOpenRow = (row) => {
        history.push({
            pathname: '/excepcionadas/' + row['ID_DOMICILIO_RNUM'],

        });
    }

    useEffect(() => {
        const query = {
            query: {
                /*match: {
                  "direccion_normalizada": document.getElementById("search_location").value
                },
                match_phrase: {
                  "tipo": "EXCEPCIONADA"
                }*/
                bool: {
                    must: [
                        {
                            match: {
                                "tipo": "excepcionada"
                            }
                        }
                    ]
                }

            },
            size: 30
        };

        axios.get(`${backendAPI}/api/consulta`, {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        }).then((res) => {

            console.log("-----------------------------------------------------------------------------------------------------------------")
            setCurrentPage(1);
            setLoading(false);
            console.log(res.data)
            setDirecciones(res.data)
        })


        /* AddressServices.getAll().then((res) => {
            console.log(res)
            console.log(res.data)
        }) */


        /* setTimeout(function () {
            setLoading(false);
        }, 3000); */
    }, [])

    console.log(emptyRows())
    return (
        <>
            <div className="section section-basic" id="basic-elements">
                <img
                    alt="..."
                    className="path"
                    src={require("../../assets/img/path1.png")}
                />
                <Container style={{ marginBottom: -20, maxWidth: "90%" }}>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Selector</BreadcrumbItem>
                    </Breadcrumb>
                    <h3 className="d-none d-sm-block text-center">
                        Direcciones Excepcionadas Pendientes
                    </h3>
                    {loading ?
                        <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                alt="..."
                                width="150"
                                src={require("../../assets/img/loadingIndicator.gif")}
                            /></div> :
                        <TableContainer component={PaperStyled}>
                            <Table sx={{ minWidth: 500 }} size="small" aria-label="custom pagination table">
                                <TableBody>
                                    {currentTableData.map((row, index) => (
                                        <TableRow hover key={index} onDoubleClick={() => handleOpenRow(row)}>
                                            <TableCell component="th" scope="row">
                                                {row['ID_DOMICILIO_RNUM']}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row['SUBTITULO'] + " " + row['CALLE'] + " " + row['NUMERO'] + " " + row['COLONIA'] + " " + row['CIUDAD'] + " " + row['ESTADO']}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Button className="btn-simple btn-icon" size="sm" color="success"
                                                    onClick={() => handleOpenRow(row)}>
                                                    <i className="tim-icons icon-simple-add" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {emptyRows() > 0 && (
                                        <TableRow style={{ height: 33 * emptyRows() }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <br />
                            <PaginationComponent
                                totalCount={direcciones.length}
                                currentPage={currentPage}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                                siblingCount={0} />
                        </TableContainer>
                    }
                </Container>
            </div>
        </>
    );
}

export default SelectorPage;