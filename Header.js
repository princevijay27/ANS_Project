import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "./walletConnect/ConnectWallet";
import WalletInfo from "./walletConnect/WalletInfo";
import { truncateAddress } from "./walletConnect/CommonFunction";
import { common } from "./css/CommonCss";
import { useNavigate } from "react-router-dom";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import "./css/nav.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


export default function PrimarySearchAppBar() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { active, account, deactivate } = useWeb3React();
  const [openWallets, setOpenWallets] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (account && active) {
      setOpenWallets(false);
    }
  }, [active, account]);

  const btnhandler = () => {
    setOpenWallets(true);
  };

  const handleClose = () => {
    setOpenWallets(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.mainMenu}
    >
      <IconButton className={classes.crossIcon} onClick={handleMobileMenuClose}>
        <CancelRoundedIcon />
      </IconButton>

      <MenuItem>
      <Button                
       target="_blank"
       component="a"
       href="https://myai.zone"
      >
      Home
      </Button>
      </MenuItem>
      <MenuItem>
      <Button                
       target="_blank"
       component="a"
       href="https://image.myai.zone/privacy-policy"
      >
      Privacy-Policy
      </Button>
      </MenuItem>
      <MenuItem>
      <Button                
       target="_blank"
       component="a"
       href="https://image.myai.zone/cookies"
      >
      Cookies
      </Button>
      </MenuItem>
      <MenuItem>
      <Button                
       target="_blank"
       component="a"
       href="https://image.myai.zone/disclaimer"
      >
      Disclaimer
      </Button>
      </MenuItem>
      <MenuItem>
      <Button                
       target="_blank"
       component="a"
       href="https://image.myai.zone/whitepaper-v.1.0.pdf"
      >
      WhitePaper
      </Button>
      </MenuItem>
      {account ? (
        <>
          <MenuItem>
            <Typography color="secondery" variant="h4">
              {truncateAddress(account)}
            </Typography>
          </MenuItem>
          <Button
            variant="contained"
            className={classes.btnsnav}
            onClick={() => deactivate()}
          >
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          className={classes.btnsnav}
          onClick={btnhandler}
          variant="contained"
        >
          Connect Wallet
        </Button>
      )}
    </Menu>
  );

  const appBarStyles = {
    backgroundImage: scroll
      ? ""
      : "linear-gradient(to right, #ca5ad3 , #FF916B)",
    transition: "background-color 0.3s ease",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {openWallets && <ConnectWallet handleClose={handleClose} />}
      <AppBar position="fixed" style={appBarStyles} className={classes.appBar}>
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            className={classes.appLogo}
            onClick={() => navigate("/")}
          />
          <Box className={classes.navOptions}>
            <Box className={classes.options}>
              <Typography
                color="primary"
                variant="h6"
                lassName="nav-item"
              >
              </Typography>
              
              
            </Box>
            {/* <Box className={classes.options}>
              <MouseOverPopover />
            </Box> */}
            <li className="nav-item">
              <a className="dropdown-toggle nav-">
                Pages <ArrowDropDownIcon />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://image.myai.zone/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://image.myai.zone/privacy-policy"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://image.myai.zone/cookies"
                  >
                    Cookies
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://image.myai.zone/terms-conditions"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://image.myai.zone/disclaimer"
                  >
                    Disclaimer & User Warranties
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://image.myai.zone/whitepaper-v.1.0.pdf"
                  >
                    WhitePaper
                  </a>
                </li>
              </ul>
            </li>
          </Box>
          <Box className={classes.walletDetails}>
            {account ? (
              <Box sx={{ margin: "auto 0" }}>
                <WalletInfo />
              </Box>
            ) : (
              <Button
                onClick={() => btnhandler()}
                variant="contained"
                color="secondary"
                className={classes.btns}
              >
                Connect Wallet
              </Button>
            )}
          </Box>
          <Box className={classes.menuicon}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuRoundedIcon sx={{ color: "#000", fontSize: "40px" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

const useStyles = makeStyles()((theme) => {
  return {
    dropdownHeader: {
      float: "left",
      overflow: "hidden",
      "&:hover": {
        display: "block",
      },
    },
    dropdownContentA: {
      float: "none",
      color: "black",
      padding: "12px 16px",
      textDecoration: "none",
      display: "block",
      textAlign: "left",
    },
    dropdownContent: {
      display: "none",
      position: "absolute",
      backgroundColor: "#f9f9f9",
      minWidth: "160px",
      boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
      zIndex: 1,
      "&:hover": {
        display: "block",
      },
    },
    headerText: {
      color: "#000",
    },
    walletDetails: {
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
    },
    mainGrid: {
      ...common.row,
      width: "100%",
      height: "100%",
      backgroundColor: "red" /* For browsers that do not support gradients */,
      backgroundImage: "linear-gradient(to right, #f0346d , #FD6D4B)",
      padding: "20px 0",
    },
    crossIcon: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      position: "fixed",
      top: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#FFFFFF",
    },
    options: {
      ...common.flexRow,
      cursor: "pointer",
      margin: "0 20px",
    },
    btns: {
      textTransform: "none",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "6px 12px",
    },
    btnsnav: {
      ...common.buttons,
      width: "90%",
      textTransform: "none",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "6px 12px",
      margin: "0 10px",
    },
    mainMenu: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    downArrow: {
      margin: "auto 10px",
    },
    appLogo: {
      borderRadius: "50%",
      cursor: "pointer",
      height: "50px",
      width: "50px",
      [theme.breakpoints.down("sm")]: {
        height: "50px",
        width: "50px",
      },
    },
    renderMoile: {
      color: "#110d2e",
    },
    appBar: {
      padding: "10px",
      backgroundColor: "#FF9F83",
      [theme.breakpoints.up("md")]: {
        padding: "10px 30px",
      },
    },
    menuicon: {
      display: "flex",
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    navOptions: {
      display: "none",
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
    },
    searchBar: {
      backgroundColor: "#FFFFFF",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  };
});
