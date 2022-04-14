import {
    FormInputLabel,
    Input,
    Group
} from './FormInput.styled';

const FormInput = ({label, inputObject}) => {
    return(
        <Group>
            <Input {...inputObject} />
            {label && 
            (<FormInputLabel shrink={inputObject.value.length}>
                {label}
             </FormInputLabel>)
            }
            {/*
            1.className內若otherProps內的value存在
            意思就是輸入任何字元以後
            套用shrink這個className
            2.用 && logic operator
            若label存在，才render label tag
            */}
        </Group>
    )
}

export default FormInput;