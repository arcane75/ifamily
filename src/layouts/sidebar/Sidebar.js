import React, { useState, useEffect } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse, ListItemButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Avatar from "@mui/material/Avatar";
import { Outlet } from "react-router-dom";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AnchorIcon from '@mui/icons-material/Anchor';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Skeleton from '@mui/material/Skeleton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import axios from "axios";

const drawerWidth = 300
const Sidebar = (props) => {
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(0);
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

    const baseURL = `https://www.ifamilymart.com.bd/api/getWebsiteInfo/`;

    useEffect(() => {
        console.log('BaseURL', baseURL)
        axios?.get(baseURL)
            .then((res) => {
                setSidebar(res.data.menu_item);
                setClicked(res.data.menu_item.type_id)
                console.log('data', res.data.menu_item);
            })
            .catch((error) => {
                alert(error);
                // setError(true)
            })
    }, []);

    const drawer = (
        <List sx={{ mt: 10 }}>

            {
                sidebarItem?.map((sideItem) =>
                    <Box >

                        <ListItemButton onClick={() => {
                            setOpen(!open)
                            setClicked(sideItem.type_id)

                        }}>
                            <ListItemAvatar sx={{ minWidth: '35px' }}>
                                <Avatar
                                    alt={sideItem?.product_type}
                                    src={sideItem?.type_icon}
                                    sx={{ height: '20px', width: '20px', }}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={sideItem?.product_type} />
                            {
                                sideItem?.sub_menu?.length > 0 ?
                                    <>
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </>
                                    : null

                            }
                        </ListItemButton>
                        <Collapse

                            in={open} timeout="auto" unmountOnExit>
                            {
                                sideItem.sub_menu?.map(subItem =>
                                    <>
                                        {
                                            clicked === sideItem.type_id ?
                                                <List component="div" disablePadding>
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <ListItemText primary={subItem?.subproduct_type} />
                                                    </ListItemButton>
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
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;
    const navStyle = {
        backgroundColor: "white",
        color: "black",
        boxShadow:
            " 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    };
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                style={navStyle}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <Typography sx={{ display: { xs: "none", md: "block" } }}>
                        <NavLink
                            style={{ textDecoration: "none", color: "gray" }}
                            to="/home"
                        >
                            <Button color="inherit">Home</Button>
                        </NavLink>
                        <NavLink
                            style={{ textDecoration: "none", color: "gray" }}
                            to="/services"
                        >
                            <Button color="inherit">SERVICES</Button>
                        </NavLink>
                    </Typography>
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
            </AppBar>
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
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 10,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Outlet></Outlet>
            </Box>
        </Box>
    );
};
export default Sidebar;