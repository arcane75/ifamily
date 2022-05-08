import React, { useEffect, useState } from 'react';
import { useAppState, useAppDispatch } from "../contexts/app/app.provider";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography } from '@mui/material';
import { IMAGE_URL } from '../common/baseUrl';

const Category = () => {
    const menu_item = useAppState("sidebarData");
    const { type_id, subtype_id } = useParams();
    console.log('sub type id click',subtype_id);
    const [subCategoryInfo, setSubCategoryInfo] = useState([]);
    const navigate = useNavigate();
    // mobile_banner
    let SubCategory = menu_item.filter(subInfo => subInfo.type_id === type_id);
    useEffect(() => {

        setSubCategoryInfo(SubCategory[0]?.sub_menu);
    }, [type_id])
    // subCategoryInfo?.map(subCat => )}
    // backgroundImage: `url(${IMAGE_URL + 'banner/' + subCat.mobile_banner})`,

    const handleCardClick = (subtype_id) => {
        navigate(`/subcategory/${subtype_id}`);
      };

      
    console.log('menu_item', subCategoryInfo);
    return (
        <>
                <Grid container spacing={2}>
                    {subCategoryInfo?.map(subCat => (
                        <Grid item xs={6} md={3} lg={3}
                        // key={product.product_id}
                        onClick={() => handleCardClick(subCat.subtype_id)}
                        >
                            <Paper 
                            elevation={2} 
                            sx={{ width: { xs: '100%', md: '160px' }, borderRadius: 2 }}>
                            
                                <Box
                                    sx={{
                                        backgroundImage: `url(${IMAGE_URL + 'banner/' + subCat.mobile_banner})`,
                                        height: '160px', width: { xs: '100%', md: '160px' },
                                        backgroundSize: 'cover',
                                        borderRadius: 2,
                                    }}
                                >

                                </Box>

                            </Paper>
                        </Grid>
                    ))}

                </Grid>
        </>

    );
};

export default Category;