import {
	Button,
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogBody,
	AlertDialogHeader,
	AlertDialogOverlay,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const ConfirmRemovalAlert = ({ isOpen, onClose, cancelRef, itemToDelete, deleteAction }) => {
	const dispatch = useDispatch();
	const onDeleteItem = () => {
		dispatch(deleteAction(itemToDelete._id));
		onClose();
	};
	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Xóa {itemToDelete.name}
					</AlertDialogHeader>
					<AlertDialogBody>Bạn có chắc không? Bạn không thể hoàn tác hành động này sau đó.</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Hủy
						</Button>
						<Button colorScheme='red' onClick={onDeleteItem} ml={3}>
							Xóa {itemToDelete.name}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default ConfirmRemovalAlert;