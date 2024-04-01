import styles from './Home.module.scss';
import Navbar from '../../components/Navbar';
import FilterTransactions from '../../hocs/FilterTransactions';

const Home = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <Navbar />
            </nav>

            <main className={styles.main}>
                <FilterTransactions />
            </main>
        </div>
    );
}

export default Home;