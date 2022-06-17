import React, { useState } from 'react';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/MapComponent';
import { withStyles } from '@mui/styles';
import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import AddressServices from '../../Services/AddressServices';

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        maxHeight: 117
    },
}))(Paper);

const ConsultaPage = () => {

    const [selectedDirection, setSelectedDirection] = useState(null);
    const [zoom, setZoom] = useState(2);
    const [searchValue, setSearchValue] = useState('');
    const [infoValue, setInfoValue] = useState('');
    const [searchData, setSearchData] = useState([]);

    const handleDragEndMarker = (address) => {
        console.log(address)
        setSelectedDirection(address);
    }

    const handleSearchItemClick = item => {
        console.log(item)
        setSelectedDirection(item)
        setZoom(15);
    }

    const handleInfoChanged = (value) => {
        setInfoValue(value);
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
                            }
                        ]
                    }

                },
                size: 30
            };
            AddressServices.searchByQuery(query).then((res) => {
                console.log(res.data.hits.hits);
                setSearchData(res.data.hits.hits);
            }).catch(err => { console.log(err) })
        } else setSearchData([])
        setSearchValue(value);
    }

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
                            <MapDataForm handleInfoChanged={handleInfoChanged} data={selectedDirection} dirnorm={infoValue} isConsult />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ConsultaPage;