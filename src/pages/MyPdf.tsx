import PdfComp from "../components/PdfComp"
import { useEffect } from "react"
import { allPdf } from "../redux/features/allPdfsSclice"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import style from '../styles/MyPdf.module.css'

const MyPdf = (): React.JSX.Element => {
    const dispatch = useAppDispatch()
    const allPdfs = useAppSelector(state => state.pdf.pdf)

    useEffect(() => {
        dispatch(allPdf())
    },[dispatch])

    return (
        <section className={style.my_pdf}>
            <div className={style.container}>
                {
                    allPdfs.length === 0 ? <h1>Not pdf</h1> : allPdfs.map((pd, i) =>{
                        return (
                            <PdfComp
                                key={i}
                                fielName={pd.fielName}
                                filePathUrl={pd.filePathUrl}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default MyPdf
