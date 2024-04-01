import styles from './ApiDocs.module.scss';
import { Button } from "@mui/material";

const ApiDocs = () => {
    return (
        <Button
            href="http://localhost:3000/api-docs/"
            target="_blank"
            variant="contained"
            className={styles.button}
        >
            API Docs
        </Button>
    );
}

export default ApiDocs;