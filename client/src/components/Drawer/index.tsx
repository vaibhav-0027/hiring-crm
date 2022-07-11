import { styled, CSSObject, Theme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useHistory } from 'react-router-dom';

const Drawer = () => {
    const drawerWidth = 240;
    const history = useHistory();

    const openedMixin = (theme: Theme): CSSObject => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    const _renderListItem = (text: string, link: string, Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>) => {
        const _clickHandler = () => {
            history.push(link);
        }

        return (
            <ListItem onClick={_clickHandler} key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        )
    }

    const [open, setOpen] = useState<boolean>(true);

    const _handleDrawerToggle = () => {
        setOpen((prev: boolean) => !prev);
    };

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={_handleDrawerToggle}>
                    {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {_renderListItem("Home", "/home", HomeIcon)}
                {_renderListItem("Companies", "/companies", BusinessIcon)}
                {_renderListItem("Contacts", "/contacts", ContactPhoneIcon)}
                {_renderListItem("Clients", "/clients", AssignmentIndIcon)}
                {_renderListItem("Vacancies", "/vacancies", WorkHistoryIcon)}
            </List>
        </Drawer>
    )
}

export default Drawer;