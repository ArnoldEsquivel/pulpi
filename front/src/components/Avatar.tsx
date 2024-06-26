import styles from './Avatar.module.scss';
import { useState } from 'react';
import {
    Menu,
    Button,
    MenuItem
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles.button}
            >
                Contact
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className={styles.menu}
            >
                <MenuItem
                    onClick={() => window.open('https://github.com/ArnoldEsquivel', '_blank')}
                    className={styles.menu_item}
                >
                    <GitHubIcon className={styles.icon} sx={{ color: 'black' }} />
                    GitHub
                </MenuItem>
                <MenuItem
                    onClick={() => window.open('https://www.linkedin.com/in/arnold-esquivel-41a5a9172/', '_blank')}
                    className={styles.menu_item}
                >
                    <LinkedInIcon className={styles.icon} sx={{ color: '#126bc4' }} />
                    LinkedIn
                </MenuItem>
                <MenuItem
                    onClick={() => window.open('https://wa.link/c0rp9b', '_blank')}
                    className={styles.menu_item}
                >
                    <WhatsAppIcon className={styles.icon} sx={{ color: '#0bc141' }} />
                    WhatsApp
                </MenuItem>
            </Menu>
        </div>
    );
}