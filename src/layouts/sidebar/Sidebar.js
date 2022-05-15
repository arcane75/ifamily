import React, { useState, useEffect } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItem, ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Outlet } from "react-router-dom";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import axios from "axios";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import Products from "../../Components/product-grid/product-list/product-list";
import CartPopUp from "../../features/carts/cart-popup";
import { useParams } from 'react-router-dom';
const drawerWidth = 350
const Sidebar = (props) => {
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(0);
    const [click, setClick] = useState(false);
    const [sidebarItem, setSidebar] = useState([]);
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);


    const activeStyle = ({ isActive }) => {
        return {
            borderRight: isActive ? "2px solid #00a1ba" : "2px solid transparent",
            backgroundColor: isActive ? "#f4f5f8" : 'white'
        };
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    console.log('type_id', clicked);
    const handleClick = () => {
        setOpen(!open);
        setClicked(!clicked)

    };
    const isClicked = useAppState("click");
    const mobile = useAppState("isMobile");
    const showProduct = useAppState("showProductInfo");
    console.log('show product', showProduct);
    const baseURL = `https://www.ifamilymart.com.bd/api/getWebsiteInfo/`;

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('BaseURL', baseURL)
        axios?.get(baseURL)
            .then((res) => {
                dispatch({ type: 'SAVE_SIDEBAR_DATA', payload: res.data.menu_item });
                dispatch({ type: 'SAVE_PRODUCT_INFO', payload: res.data.allProductInfo });
                dispatch({ type: 'SAVE_CHARGE_INFO', payload: res.data.charge_info });
                setSidebar(res.data.menu_item);
                setClicked(res.data.menu_item.type_id)
                console.log('menu_item data:', res.data.menu_item);
            })
            .catch((error) => {
                alert(error);
                // setError(true)
            })
    }, []);

    const drawer = (
        <Box sx={{
            mt: 1,

        }} >
            <List>

                {
                    sidebarItem?.map((sideItem) =>
                        <Box >

                            <ListItem button onClick={() => {
                                setOpen(!open)
                                setClicked(sideItem.type_id)
                            }}
                                component={Link}
                                to={`/category/${sideItem.type_id}`}
                            >
                                <ListItemAvatar sx={{ minWidth: '35px' }}>
                                    <Avatar
                                        alt={sideItem?.product_type}
                                        src={sideItem?.type_icon}
                                        sx={{ height: '20px', width: '20px', }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    onClick={() => {
                                        dispatch({ type: 'IS_CLICKED', payload: true });
                                        setClick(isClicked)

                                    }}
                                    primary={sideItem?.product_type}
                                />
                                {
                                    sideItem?.sub_menu?.length > 0 ?
                                        <>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </>
                                        : null

                                }
                            </ListItem>
                            <Collapse

                                in={open} timeout="auto" unmountOnExit>
                                {
                                    sideItem.sub_menu?.map(subItem =>
                                        <>
                                            {
                                                clicked === sideItem.type_id ?
                                                    <List component="div" disablePadding>
                                                        <ListItem
                                                            onClick={() => {

                                                                setClick(!click)

                                                            }}
                                                            button
                                                            sx={{ pl: 4 }}
                                                            component={Link}
                                                            to={`/subcategory/${subItem.subtype_id}`}
                                                        >
                                                            <ListItemText primary={subItem?.subproduct_type} />
                                                        </ListItem>
                                                    </List> : null
                                            }
                                        </>
                                    )

                                }
                            </Collapse>
                        </Box>

                    )
                }

            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;
 
    return (
        <Box
            sx={{
                display: {
                    sm: {
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    lg: 'flex',
                    md: 'flex',
                }
            
            }}>

            <Toolbar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"

            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },

                    }}

                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            marginTop: '90px',
                        }
                        ,

                    }}

                    // style={{
                    //     "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
                    //         '::-webkit-scrollbar': {
                    //             // width: '1px !important',
                    //             overflowY: 'hidden'
                    //         },
                    //     }

                    // }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 3,
                    pr: {md: 3, sm: 0, lg: 3},
                    mt: {md: 10, sm: 0, lg: 10},
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`,
                    },

                }}
            >
                {
                    isClicked ?
                        <Outlet></Outlet>
                        :
                        <Products
                            productList={showProduct}
                        />
                }

            </Box>
        </Box>
    );
};
export default Sidebar;