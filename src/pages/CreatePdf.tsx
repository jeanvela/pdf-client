import { ChangeEvent, FormEvent, useState } from 'react'
import style from '../styles/CreatePdf.module.css'
import { useAppDispatch } from '../redux/hook'
import { uploadPdf } from '../redux/features/uploadPdfSlice'

const CreatePdf = (): React.JSX.Element => {
    const dispatch = useAppDispatch()
    const [document, setDocument] = useState<File | null>()
    const changueInput = async (event: ChangeEvent<HTMLInputElement>) => {
        const values = event.currentTarget.files !== null ? event.currentTarget.files[0] : null
        setDocument(values)
    }
    const submit =async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (document) {
            return await dispatch(uploadPdf(document))
        }
        return
    }

    return (
        <section className={style.created}>
            <h1 className={style.h1}>Upload pdf</h1>
            <form action="" className={style.form} onSubmit={submit}>
                <div className={style.container}>
                    <label htmlFor="" className={style.label}>File</label>
                    <input type="file" name="" id="" onChange={changueInput} className={style.input}/>
                </div>
                <button className={style.btn}>Upload file</button>
            </form>
        </section>
    )
}

export default CreatePdf
