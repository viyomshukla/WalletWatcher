import * as Yup from 'yup';

const FormValid=Yup.object({
    password: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/, 'Password must start with a capital letter and contain at least one symbol')


})
export default  FormValid