import styles from './Navbar.module.scss';
import AvatarMenu from './Avatar';
import ApiDocs from './ApiDocs';
import Logo from '/logo.png';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <div className={styles.nav_links}>
                <AvatarMenu />
                <ApiDocs />
            </div>
        </div>
    );
}

export default Navbar;