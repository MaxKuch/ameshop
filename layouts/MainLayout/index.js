import Footer from "../../components/Footer"
import Header from "../../components/Header"
import styles from './MainLayout.module.scss'
import { useSelector } from "react-redux"
import LoadingOverlay from '../../components/LoadingOverlay'

export default function MainLayout({ children }) {
    const isLoading = useSelector(state => state.loading.isLoading)
    return (
    <div className="container">
        <LoadingOverlay visible={isLoading}/>
        <Header/>
        <main className={styles.main}>{children}</main>
        <Footer/>
    </div>
    )
}