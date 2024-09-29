import {forwardRef} from 'react'
import { ClassesHelpers } from '../Constants'

const Input = forwardRef(({tittle, InputType, invalid, ...props}, ref)=> {
    const style = (invalid === 0) ? 'focus:border-black bg-gray-100' : 'focus:border-red-800 bg-red-200';
    const textStyle = (invalid === 0) ? 'text-gray-800' : 'text-red-900';
    return (
        <>
            <label className={`font-semibold ${textStyle}`}>{tittle}</label>
            <InputType {...props} ref={ref} className={`mb-3 ${ClassesHelpers.input} ${style}`} />
        </>
    )
});

export default Input;