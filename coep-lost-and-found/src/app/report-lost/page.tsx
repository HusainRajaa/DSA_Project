import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ItemForm from '@/components/ItemForm';
// We can reuse the same stylesheet as the found page
import styles from '../report-found/FormPage.module.css'; 

export default function ReportLostPage() {
    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Report a Lost Item</h1>
                        <p className={styles.subtitle}>
                            Don't worry, we'll help you find it. Fill out the details below to create a lost item report.
                        </p>
                    </div>
                    <ItemForm formType="Lost" />
                </div>
            </main>
            <Footer />
        </div>
    );
}
