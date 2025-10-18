import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ItemForm from '@/components/ItemForm';
import styles from './FormPage.module.css';

export default function ReportFoundPage() {
    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Report a Found Item</h1>
                        <p className={styles.subtitle}>
                            Thank you for helping a fellow student! Please provide as much detail as possible about the item you found.
                        </p>
                    </div>
                    <ItemForm formType="Found" />
                </div>
            </main>
            <Footer />
        </div>
    );
}
