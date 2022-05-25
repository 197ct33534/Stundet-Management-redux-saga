import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormField';
import { selectCityOtions } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
export interface IStudentFormProps {
    initialValues?: Student;
    onSubmit?: (formValues: Student) => void;
}
const schema = yup
    .object({
        name: yup
            .string()
            .required('bạn quên nhập tên')
            .test('two-word', 'phải có ít nhất 2 từ', (value) => {
                if (!value) return true;
                const parts = value?.split(' ') || [];
                return parts.filter((x) => Boolean(x)).length >= 2;
            }),
        age: yup
            .number()
            .positive('tuổi phải là số dương')
            .integer('tuổi phải là số nguyên')
            .min(18, 'tuổi phải lớn hơn 18')
            .max(60, 'tuổi không được lớn hơn 60')
            .required('hãy nhập tuổi')
            .typeError('sai kiểu dữ liệu'),
        mark: yup
            .number()
            .min(0, 'điểm bé nhất là 0')
            .max(10, 'điểm tối đa là 10')
            .required('hãy nhập điểm')
            .typeError('sai kiểu dữ liệu'),
        gender: yup
            .string()
            .oneOf(['male', 'female'], 'chọn male hoặc female')
            .required('hãy chọn giới tính'),
        city: yup.string().required('hãy chọn thành phố'),
    })
    .required();

export default function StudentForm({ initialValues, onSubmit }: IStudentFormProps) {
    const { control, handleSubmit } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = (formValues: Student) => {
        console.log('submit ', formValues);
    };
    const cityOptions = useAppSelector(selectCityOtions);
    return (
        <Box width={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField control={control} label="tên sinh viên" name="name" />

                <RadioGroupField
                    name="gender"
                    control={control}
                    label="giới tính"
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                    ]}
                />
                <InputField control={control} label="điểm" name="mark" type="number" />
                <InputField control={control} label="tuổi" name="age" type="number" />

                <SelectField
                    control={control}
                    label="thành phố"
                    name="city"
                    options={cityOptions}
                />
                <Box mt={3}>
                    <Button variant="contained" type="submit">
                        save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
