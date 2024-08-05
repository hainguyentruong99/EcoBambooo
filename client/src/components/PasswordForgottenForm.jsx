import { Text, Stack, Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const handleChange = (event) => {
		setEmail(event.target.value);
	};

	return (
		<>
			<Box my='4'>
				<Text as='b'>Nhập địa chỉ email của bạn dưới đây.</Text>
				<Text>Chúng tôi sẽ gửi cho bạn email có liên kết để đặt lại mật khẩu.</Text>
			</Box>
			<Stack>
				<Input
					mb='4'
					type='text'
					name='email'
					placeholder='Địa chỉ email'
					label='Email'
					value={email}
					onChange={(e) => handleChange(e)}
				/>
				<Button colorScheme='yellow' size='lg' fontSize='md' onClick={() => dispatch(sendResetEmail(email))}>
					Xác nhận
				</Button>
			</Stack>
		</>
	);
};

export default PasswordForgottenForm;