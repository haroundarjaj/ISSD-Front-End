import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/Map/MapComponent';
import axios from 'axios';
import { API } from '../../Config/apiUrl';
import { withStyles } from '@mui/styles';
import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        maxHeight: 117
    },
}))(Paper);

const listItems = [
    { title: 'Address 1', isfromServer: true },
    { title: 'Address 2', isfromServer: false },
    { title: 'Address 3', isfromServer: true },
    { title: 'Address 4', isfromServer: false },
    { title: 'Address 5', isfromServer: false },
    { title: 'Address 6', isfromServer: false },
]

const ConsultaPage = (props) => {
    const { id } = useParams();

    const [selectedDirection, setSelectedDirection] = useState(null);
    const [zoom, setZoom] = useState(2);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [infoValue, setInfoValue] = useState('');


    const handleDragEndMarker = (address) => {
        console.log(address)
        setSelectedDirection(address);
    }

    const handleSearchItemClick = item => {
        setSelectedDirection(item)
        setZoom(15);
    }

    const handleSearchValueChange = (e) => {
        const { value } = e.target;
        console.log(value)

        if (value !== '') {
            // const filteredList = listItems.filter(item => item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
            // setSearchData(filteredList);
            const query = {
                query: {
                    bool: {
                        must: [
                            {
                                match_phrase: {
                                    "direccion_normalizada": value
                                }
                            },
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

            axios.get('http://192.168.50.91:9200/direcciones/_search', {
                params: {
                    source: JSON.stringify(query),
                    source_content_type: 'application/json'
                }
            }).then((res) => {
                console.log(res.data.hits.hits);
                setSearchData(res.data.hits.hits);
            }).catch(err => { console.log(err) })
        } else setSearchData([])
        setSearchValue(value);
    }

    const handleInfoChanged = (value) => {
        setInfoValue(value);
    }

    useEffect(() => {
        /* const query = {
            query: {
                match: {
                    "_id": id
                }
            },
            size: 5
        };
        axios.get(`${API}/direcciones/_search`, {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        }).then((res) => {
            setSelectedDirection(res.data.hits.hits[0])
            console.log(res.data.hits.hits)
        }) */
    }, []);
    console.log(props)
    return (
        <>
            <div className="section section-typo">
                <img
                    alt="..."
                    className="path"
                    src={require("../../assets/img/path1.png")}
                />
                <img
                    alt="..."
                    className="path path1"
                    src={require("../../assets/img/path3.png")}
                />
                <Container style={{ maxWidth: "90%" }}>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Consulta</BreadcrumbItem>
                    </Breadcrumb>

                    <Input
                        type="text"
                        name="search"
                        id="search-input"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchValueChange}
                    />
                    {searchData.length > 0 && <PaperStyled>
                        <List>
                            {/* searchData.filter(obj => obj.isfromServer).map(row =>
                            <ListItem dense disablePadding>
                                <ListItemButton>
                                    <ListItemText
                                        primary={<Typography variant="body2" style={{ color: '#D850D4' }}>{row.title}</Typography>} />
                                </ListItemButton>
                        </ListItem>) */}
                            {/* searchData.filter(obj => obj.isfromServer).length > 0 && searchData.filter(obj => !obj.isfromServer).length > 0 && <Divider style={{ width: '100%' }} /> */}
                            {/* searchData.filter(obj => !obj.isfromServer).map(row =>
                            <ListItem dense disablePadding>
                                <ListItemButton>
                                    <ListItemText
                                        primary={<Typography variant="body2">{row.title}</Typography>} />
                                </ListItemButton>
                        </ListItem>) */}
                            {searchData.map(row =>
                                <ListItem dense disablePadding onClick={() => handleSearchItemClick(row)} style={row._id === selectedDirection?._id ? { backgroundColor: 'gray' } : {}}>
                                    <ListItemButton>
                                        <ListItemText
                                            primary={<Typography variant="body2">{row._source.direccion_normalizada}</Typography>} />
                                    </ListItemButton>
                                </ListItem>)}
                        </List>
                    </PaperStyled>}
                    <br />
                    <Row>
                        <Col>
                            <MapComponent
                                location={selectedDirection ?
                                    { lat: parseFloat(selectedDirection?._source.latitud), lng: parseFloat(selectedDirection?._source.longitud) }
                                    : { lat: 0.00, lng: 0.00 }}
                                zoom={zoom}
                                handleDragEndMarker={handleDragEndMarker}
                                isConsult />
                        </Col>
                        <Col>
                            <MapDataForm data={selectedDirection} handleInfoChanged={handleInfoChanged} isConsult />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ConsultaPage;