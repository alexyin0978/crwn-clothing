import './FormInput.scss';

const FormInput = ({label, inputObject}) => {
    return(
        <div className='group'>
            <input className='form-input'{...inputObject} />
            {label && 
            (<label 
                className={`${
                    inputObject.value.length ? 'shrink' : null} 
                    form-input-label`}
            >{label}</label>)}
            {/*
            1.className內若otherProps內的value存在
            意思就是輸入任何字元以後
            套用shrink這個className
            2.用&& logic operator
            若label存在，才render label tag
            */}
        </div>
    )
}

export default FormInput;