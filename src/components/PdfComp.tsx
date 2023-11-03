import style from '../styles/PdfComp.module.css'

type PDF = {
    fielName: string
    filePathUrl: string
}

const PdfComp = ({fielName, filePathUrl}: PDF) => {
    return (
        <article className={style.container}>
            <iframe title={fielName} src={filePathUrl} width={160} height={160}></iframe>
        </article>
    )
}

export default PdfComp
