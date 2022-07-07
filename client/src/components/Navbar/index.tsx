import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { clearUserInfo, getUserInfo } from '../../helpers/localStorageHandler';
import { auth } from '../../helpers/firebase';
import { signOut } from "firebase/auth";

const Navbar = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userName, setUserName] = useState<string>('User');

    useEffect(() => {
        const run = async () => {
            const userInfo = await getUserInfo();
            if (userInfo !== {}) {
                setUserName(userInfo.providerData[0]?.displayName || "User")
            }
        }

        run();
    }, []);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                clearUserInfo();
                history.push("/login");
            }
        })
        // eslint-disable-next-line
    }, []);

    const _handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const _handleClose = () => {
        setAnchorEl(null);
    };

    const _profileClickHandler = () => {
        _handleClose();
        history.push("/profile");
    }

    const _logoutClickHandler = async () => {
        _handleClose();
        await signOut(auth);
        await clearUserInfo();
        history.push("/login");
    }

    return (
        <AppBar position="fixed" className='bg-primary' >
            <Toolbar variant="dense">
                <div className='w-full h-full flex flex-row'>
                    <div className='w-1/2 flex items-center justify-end cursor-pointer'>
                        <Link to="/home">
                            <Typography>
                                HIRING-CRM
                            </Typography>
                        </Link>
                    </div>

                    <div className='w-1/2 flex flex-row items-center justify-end'>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={_handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={_handleClose}
                        >
                            <MenuItem>Hi, {userName}</MenuItem>
                            <MenuItem onClick={_profileClickHandler}>Profile</MenuItem>
                            <MenuItem onClick={_logoutClickHandler}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar