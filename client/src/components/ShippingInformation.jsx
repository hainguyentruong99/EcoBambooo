import {
	Box,
	Button,
	Flex,
	FormControl,
	Heading,
	Radio,
	RadioGroup,
	Spacer,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { setShipping } from '../redux/actions/cartActions';
import { setAddress, setPayment } from '../redux/actions/orderActions';
import TextField from './TextField';
import { Link as ReactLink } from 'react-router-dom';

const ShippingInformation = () => {
	const { shipping } = useSelector((state) => state.cart);
	const { shippingAddress } = useSelector((state) => state.order);

	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		dispatch(setAddress(values));
		dispatch(setPayment());
	};

	return (
		<Formik
			initialValues={{
				address: shippingAddress ? shippingAddress.address : '',
				postalCode: shippingAddress ? shippingAddress.postalCode : '',
				city: shippingAddress ? shippingAddress.city : '',
				country: shippingAddress ? shippingAddress.country : '',
			}}
			validationSchema={Yup.object({
				address: Yup.string().required('Vui lòng nhập địa chỉ').min(2, 'Địa chỉ quá ngắn.'),
				postalCode: Yup.string().required('Vui lòng nhập mã bưu chính.').min(2, 'Mã bưu chính quá ngắn.'),
				city: Yup.string().required('Vui lòng nhập thành phố.').min(2, 'Thành phố  quá ngắn.'),
				country: Yup.string().required('Vui lòng nhập quốc gia.').min(2, 'Quốc gia quá ngắn.'),
			})}
			onSubmit={onSubmit}>
			{(formik) => (
				<>
					<VStack as='form'>
						<FormControl>
							<TextField name='address' placeholder='Địa chỉ đường phố' label='Địa chỉ đường phố' />
							<Flex>
								<Box flex='1' mr='10'>
									<TextField name='postalCode' placeholder='Mã bưu chính' label='Mã bưu chính' type='number' />
								</Box>
								<Box flex='2'>
									<TextField name='city' placeholder='Thành phố' label='Thành phố' />
								</Box>
							</Flex>
							<TextField name='country' placeholder='Quốc gia' label='Quốc gia' />
						</FormControl>
						<Box w='100%' pr='5'>
							<Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
								Phương thức vận chuyển
							</Heading>
							<RadioGroup
								onChange={(e) => {
									dispatch(setShipping(e === 'express' ? Number(100000) : Number(50000).toFixed(2)));
								}}
								defaultValue={shipping === 50000 ? 'withoutExpress' : 'express'}>
								<Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
									<Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
										<Box>
											<Radio value='express'>
												<Text fontWeight='bold'>Giao hàng nhanh</Text>
												<Text>Gửi trong vòng 24h</Text>
											</Radio>
										</Box>
										<Stack spacing='6'>Express</Stack>
									</Stack>
									<Radio value='withoutExpress'>
										<Box>
											<Text fontWeight='bold'>Giao hàng tiêu chuẩn</Text>
											<Text>Gửi trong vòng 2 - 3 ngày</Text>
										</Box>
									</Radio>
								</Stack>
							</RadioGroup>
						</Box>
					</VStack>
					<Flex alignItems='center' gap='2' direction={{ base: 'column', lg: 'row' }}>
						<Button variant='outline' colorScheme='cyan' w='100%' as={ReactLink} to='/cart'>
							Quay lại giỏ hàng
						</Button>
						<Button
							variant='outline'
							colorScheme='cyan'
							w='100%'
							as={ReactLink}
							to='/payment'
							onClick={formik.handleSubmit}>
								Tiếp tục thanh toán
						</Button>
					</Flex>
				</>
			)}
		</Formik>
	);
};

export default ShippingInformation;