import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; {new Date().getFullYear()} COEP Lost & Found. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
