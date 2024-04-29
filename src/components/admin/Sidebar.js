import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SportsIcon from "@mui/icons-material/Sports";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import BackupIcon from "@mui/icons-material/Backup";
import BusinessIcon from "@mui/icons-material/Business";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandMore";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DashboardIcon from '@mui/icons-material/Dashboard';
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openSchedules, setOpenSchedules] = useState(false);
  const [openLogs, setOpenLogs] = useState(false);
  const [openEquipments, setOpenEquipments] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };
  const handleLogsClick = () => {
    setOpenLogs(!openLogs);
  };

  const handleEquipmentsClick = () => {
    setOpenEquipments(!openEquipments);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{
          marginRight: 2,
          "& .MuiSvgIcon-root": {
            fontSize: "3rem",
            color: "red",
            marginLeft: "20px",
          },
        }}
      >
        <MenuIcon />
        <p style={{ margin: "2px", fontWeight: "bold" }}>MENU</p>
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItemButton component={Link} to="/admin/announcement">
            <ListItemIcon>
              <CelebrationIcon />
            </ListItemIcon>
            <ListItemText primary="Announcements" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/borrows">
            <ListItemIcon>
              <VolunteerActivismIcon />
            </ListItemIcon>
            <ListItemText primary="Borrow Requests" />
          </ListItemButton>

          <ListItemButton onClick={handleEquipmentsClick}>
            <ListItemIcon>
              <SportsVolleyballIcon />
            </ListItemIcon>
            <ListItemText primary="Equipments" />
            {openEquipments ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openEquipments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/equipments"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="All" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/sports"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <SportsIcon />
                </ListItemIcon>
                <ListItemText primary="Sports" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/equipments/stock"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Stock" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleLogsClick}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
            {openLogs ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openLogs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/app/history"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule Logs" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/bor/history"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Borrowing Logs" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/order/logs"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Order Logs" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/stock/history"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Equipment Stock Logs" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/stock/list"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Product Stock Logs" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleProductsClick}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Merchandise" />
            {openProducts ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openProducts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/products"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <i className="fa fa-clipboard"></i>
                </ListItemIcon>
                <ListItemText primary="All" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/product"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <i className="fa fa-plus"></i>
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/categories"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <i className="fa fa-list-alt"></i>
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/products/stock"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <i className="fa fa-briefcase"></i>
                </ListItemIcon>
                <ListItemText primary="Stock" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="DashBoard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/orders">
            <ListItemIcon>
              <BookmarkBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>

          {/* Reviews */}
          <ListItemButton component={Link} to="/admin/reviews">
            <ListItemIcon>
              <StarHalfIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItemButton>

          {/* Settings */}
          <ListItemButton
            component={Link}
            to="/settings/6581a5b1466cfcabab4cc84f"
          >
            <ListItemIcon>
              <SettingsApplicationsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>

          <ListItemButton onClick={() => setOpenSchedules(!openSchedules)}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Schedules" />
            {openSchedules ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSchedules} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/appointments"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/locations"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Location" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Users */}
          <ListItemButton component={Link} to="/admin/users">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
        <img
          src="/images/tupt_logo.png"
          style={{
            width: "200px",
            height: "200px",
            marginLeft: "30px",
          }}
          alt="Logo"
        />
      </Drawer>
    </>
  );
};

export default Sidebar;
