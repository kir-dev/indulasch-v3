import { Page } from '../layout/Page';
import { Button, CardBody, CardFooter, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useKioskContext } from '../context/kiosk.context';
import { useEffect } from 'react';
import { useKioskUsers } from '../network/useKioskUsers.network';
import { useDeleteRole } from '../network/useDeleteRole.network';
import { UserListItem } from '../components/UserListItem';
import { AddUserModal } from '../components/AddUserModal';
import { KioskRoles } from '../types/types';
import { useChangeRole } from '../network/useChangeRole.network';
import { l } from '../utils/language';

export function UsersPage() {
  const toast = useToast();
  const { selectedKioskId } = useKioskContext();
  const { isLoading, data, makeRequest } = useKioskUsers(selectedKioskId || '');
  const { isLoading: isChangeLoading, makeRequest: changeRole } = useChangeRole(selectedKioskId || '');
  const { isLoading: isDeleteLoading, makeRequest: deleteRequest } = useDeleteRole(selectedKioskId || '');
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    makeRequest(undefined);
  }, [selectedKioskId]);
  const onDelete = (id: string) => {
    deleteRequest(id, () => {
      makeRequest(undefined);
    });
  };
  const onEdit = (mail: string) => (role: KioskRoles) => {
    changeRole(
      { mail, role },
      () => {
        toast({ title: l('page.users.roleModified'), status: 'success' });
        makeRequest(undefined);
      },
      () => {
        toast({ title: l('page.users.roleModificationError'), status: 'error' });
      }
    );
  };
  return (
    <Page title={l('title.users')} isLoading={isLoading || isDeleteLoading || isChangeLoading}>
      <CardBody>
        <VStack w='100%'>
          {data?.map((usr) => (
            <UserListItem
              key={usr._id}
              user={usr}
              onEditRole={onEdit(usr.mail)}
              onDeleteUser={() => {
                onDelete(usr._id);
              }}
            />
          ))}
        </VStack>
      </CardBody>
      <CardFooter>
        <Button onClick={onOpen}>{l('page.users.newUser')}</Button>
        <AddUserModal
          isOpen={isOpen}
          onClose={() => {
            makeRequest(undefined);
            onClose();
          }}
        />
      </CardFooter>
    </Page>
  );
}
