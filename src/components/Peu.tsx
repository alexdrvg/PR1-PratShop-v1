/// <reference types="../vite-env.d.ts" />
import styles from './Peu.module.css';
import { Link } from 'react-router-dom';

export default function Peu() {
    return (
        <footer className={styles.peuPagina}>
            <p>© 2026 PratShop Tech — Tecnología esencial</p>
            <Link to="/*">
                Política de privacitat
            </Link>
        </footer>
    );
}
