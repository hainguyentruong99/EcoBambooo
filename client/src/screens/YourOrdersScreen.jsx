import {
	TableContainer,
	Stack,
	Spinner,
	Alert,
	AlertIcon,
	AlertDescription,
	Th,
	Tbody,
	Tr,
	Thead,
	Button,
	ListItem,
	UnorderedList,
	Table,
	Td,
	AlertTitle,
	Wrap,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const YourOrdersScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, orders, userInfo } = useSelector((state) => state.user);
	const location = useLocation();

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserOrders());
		}
	}, [dispatch, userInfo]);

	return userInfo ? (
		<>
			{loading ? (
				<Wrap direction='column' align='center' mt='20px' justify='center' minHeight='100vh'>
					<Stack direction='row' spacing='4'>
						<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
					</Stack>
				</Wrap>
			) : error ? (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>We are sorry!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				orders && (
					<TableContainer minH='100vh'>
						<Table variant='striped'>
							<Thead>
								<Tr>
									<Th>Order Id</Th>
									<Th>Ngày đặt hàng</Th>
									<Th>Tổng tiền</Th>
									<Th>Items</Th>
									<Th>In Biên lai</Th>
								</Tr>
							</Thead>
							<Tbody>
								{orders.map((order) => (
									<Tr key={order._id}>
										<Td>{order._id}</Td>
										<Td>{new Date(order.createdAt).toDateString()}</Td>
										<Td>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}</Td>
										<Td>
											{order.orderItems.map((item) => (
												<UnorderedList key={item._id}>
													<ListItem>
														{item.qty} x {item.name} ({Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)})
													</ListItem>
												</UnorderedList>
											))}
										</Td>
										<Td>
											<Button variant='outline'>Biên lai</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				)
			)}
		</>
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default YourOrdersScreen;