import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { logout } from "features/Auth/userSlice";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { mainListItems, secondaryListItems } from "./listItems";
import ManageCategoryFeature from "./pages/category";
import DashBoadPage from "./pages/DashBoadPage";
import ManageOrdersFeature from "./pages/orders";
import ManageProductFeature from "./pages/products/index";
import ManageSubCategoryFeature from "./pages/subcategory";
import ManageUsersFeature from "./pages/user/index";
import ManageReviewsFeature from "./pages/rating/index";
import ManageStatiticByOrderPage from "./pages/statistics/ManageStatiticByOrderPage";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 3,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#3366cc",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      overflowY: "auto",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:3001"
    : window.location.host;
function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const [socket, setSocket] = React.useState(null);
  // const { enqueueSnackbar } = useSnackbar();
  const { current } = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (!socket) {
  //     const sk = socketIOClient(ENDPOINT, { transports: ["websocket"] });
  //     setSocket(sk);
  //     console.log(sk);
  //     sk.emit("onLogin", {
  //       id: current.id,
  //       name: current.email,
  //       isAdmin: current.email === "vhm2899@gmail.com" ? true : false,
  //     });
  //     sk.on("message", (data) => {
  //       console.log(data);
  //       enqueueSnackbar(`Tin nhắn mới:${data.body} từ ${data.name}`, {
  //         variant: "success",
  //       });
  //     });
  //     sk.on("newOrder", (data) => {
  //       console.log(data);
  //       enqueueSnackbar(`Bạn có đơn hàng mới từ ${data.name}`, {
  //         variant: "success",
  //       });
  //     });
  //   }
  // }, [socket, current.id, current.email, enqueueSnackbar]);
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    history.push("/auth/login");
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin
            </Typography>

            <IconButton color="inherit" onClick={handleLogoutClick}>
              Logout
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <CssBaseline />
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",

              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            {mainListItems}
          </List>
          <Divider />
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Routes>
                <Route path="/" element={<DashBoadPage />}></Route>
                <Route path="dashboard" element={<DashBoadPage />}></Route>
                <Route
                  path="product/*"
                  element={<ManageProductFeature />}
                ></Route>
                <Route
                  path="category/*"
                  element={<ManageCategoryFeature />}
                ></Route>
                <Route
                  path="subcategory/*"
                  element={<ManageSubCategoryFeature />}
                ></Route>
                <Route path="users/*" element={<ManageUsersFeature />}></Route>
                <Route
                  path="orders/*"
                  element={<ManageOrdersFeature />}
                ></Route>
                <Route
                  path="review/*"
                  element={<ManageReviewsFeature />}
                ></Route>
                <Route
                  path="/statistics"
                  element={<ManageStatiticByOrderPage />}
                />
              </Routes>
              {/* <Route path="/support" component={Chat}></Route> */}
              {/* <Route
                  path="/users/:id/edit"
                  component={UserCreateOrEditPage}
                ></Route> */}
              {/* <Route
                  path="/users/create"
                  component={UserCreateOrEditPage}
                ></Route>
                <Route path="/users" component={ManageUserPage}></Route>
                <Route
                  path="/product/:id/edit"
                  component={ProductEditPage}
                ></Route>
                <Route
                  path="/subcategory/:id/edit"
                  component={SubCategoryCreatePage}
                ></Route>
                <Route
                  path="/category/:id/edit"
                  component={CreateOrEditCategoryPage}
                ></Route>
                <Route
                  path="/coupon/:id/edit"
                  component={CreateOrEditCouponPage}
                ></Route>
                <Route
                  path="/feeship/:id/edit"
                  component={CreateOrEdirFeeShipPage}
                ></Route>
                <Route
                  path="/product/create"
                  component={ProductEditPage}
                ></Route>
                <Route
                  path="/coupon/create"
                  component={CreateOrEditCouponPage}
                ></Route>
                <Route
                  path="/feeship/create"
                  component={CreateOrEdirFeeShipPage}
                ></Route>
               
                <Route path="/brand" component={ManageBrandsPage}></Route>
                <Route
                  path="/category/create"
                  component={CreateOrEditCategoryPage}
                ></Route>
                <Route path="/category" component={ManageCategoryPage}></Route>
                <Route
                  path="/subcategory/create"
                  component={SubCategoryCreatePage}
                ></Route>
                <Route
                  path="/subcategory"
                  component={ManageSubCategoryPage}
                ></Route>
               
                <Route
                  path="/ordertrack/create"
                  component={CreateOrderTrackPage}
                ></Route>
                <Route path="/role/:id/edit" component={RoleEditPage}></Route>
                <Route path="/orders" component={ManageOrdersPage}></Route>
                <Route path="/role" component={ManageRolesPage}></Route>
                <Route path="/rating" component={ManageRatingPage}></Route>
                <Route path="/feeship" component={ManageFeeShipPage}></Route>
                <Route path="/coupon" component={ManageCouponPage}></Route>
                <Route
                  path="/statistics/customer/:id"
                  component={DetailStatiticByCustomerPage}
                ></Route>
                <Route
                  path="/statistics/product/:id"
                  component={DetailStatiticByProductPage}
                ></Route>

                <Route
                  path="/statistics/order"
                  component={ManageStatiticByOrderPage}
                ></Route>
               }
              </Routes>
              <Outlet />
            </Grid>
            {/* Chart */}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid> */}
              {/* <Copyright sx={{ pt: 4 }} /> */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
