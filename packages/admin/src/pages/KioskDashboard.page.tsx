import { Page } from '../layout/Page';
import { useAuthContext } from '../context/auth.context';
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  CardBody,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useKioskContext } from '../context/kiosk.context';
import { KioskRoles } from '../types/types';
import { WidgetDisplay } from '../types/kiosk.types';
import { CLIENT_BASE_URL } from '../config/environment.config';
import { TbBrowserPlus, TbCopy, TbRefreshDot } from 'react-icons/tb';
import { KioskStatusBadge } from '../components/KioskStatusBadge';
import { checkThreshold } from '../utils/checkThreshold';
import { useRequestRefreshNetwork } from '../network/useRequestRefresh.network';
import { useEffect, useMemo } from 'react';
import { PageSection } from '../components/PageSection';
import { RefreshButton } from '../components/RefreshButton';
import { RoleBadge } from '../components/RoleBadge';
import { l } from '../utils/language';

export function KioskDashboardPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  const { kiosk, selectedKioskId, update } = useKioskContext();
  const { makeRequest, isLoading } = useRequestRefreshNetwork(selectedKioskId || '');
  const clientUrl = CLIENT_BASE_URL ? CLIENT_BASE_URL + '/' + selectedKioskId : undefined;
  const role = useMemo(() => {
    return user?.roles.find((r) => r.kioskId._id === selectedKioskId);
  }, [user]);

  const reloadClient = () => {
    onClose();
    makeRequest(undefined, () => update);
  };

  useEffect(update, []);

  return (
    <Page title={kiosk?.config.meta.name || l('title.unknown')}>
      <CardBody>
        {kiosk?.lastClientQuery && checkThreshold(kiosk.lastClientQuery) && (
          <Alert status='error' mb={5}>
            <AlertIcon />
            {l('page.dashboard.alert')}
          </Alert>
        )}
        <VStack spacing={5} alignItems='flex-start' textAlign='left'>
          {clientUrl && (
            <Wrap>
              <Button leftIcon={<TbBrowserPlus />} onClick={() => window.open(clientUrl)}>
                {l('page.dashboard.openClient')}
              </Button>
              <Button variant='ghost' leftIcon={<TbCopy />} onClick={() => navigator.clipboard.writeText(clientUrl)}>
                {l('page.dashboard.copyClientUrl')}
              </Button>
            </Wrap>
          )}
          <PageSection>
            <Heading size={'md'}>{l('page.dashboard.clientId')}</Heading>
            <Text>{selectedKioskId}</Text>
          </PageSection>
          <PageSection>
            <HStack>
              <Heading size={'md'}>{l('page.dashboard.clientStatus')}</Heading>
              <RefreshButton onClick={update} />
            </HStack>
            {kiosk?.lastClientQuery && (
              <>
                <Text>{l('page.dashboard.lastUpdate')}</Text>
                <Text>{new Date(kiosk.lastClientQuery).toLocaleString('hu-HU')}</Text>
              </>
            )}
            <KioskStatusBadge date={kiosk?.lastClientQuery} />
          </PageSection>
          <PageSection>
            <Heading size={'md'}>{l('page.dashboard.role')}</Heading>
            <RoleBadge role={role?.role || KioskRoles.VISITOR} />
          </PageSection>
          <PageSection>
            <Heading size={'md'}>{l('page.dashboard.coordinates')}</Heading>
            <Text>
              {l('page.dashboard.latitude')}: {kiosk?.config.meta.coordinates.lat}
            </Text>
            <Text>
              {l('page.dashboard.longitude')}: {kiosk?.config.meta.coordinates.lon}
            </Text>
          </PageSection>
          <PageSection>
            <Heading size={'md'}>{l('page.dashboard.enabledWidgets')}</Heading>
            {kiosk?.config.widgets.map((w) => (
              <Text key={w.name}>{WidgetDisplay[w.name].name}</Text>
            ))}
          </PageSection>
          {role && role.role >= 2 && (
            <PageSection>
              <Heading size='md'>{l('page.dashboard.reloadClient')}</Heading>
              <ButtonGroup>
                <Button
                  variant='outline'
                  isDisabled={kiosk?.refreshNeeded}
                  leftIcon={<TbRefreshDot />}
                  onClick={onOpen}
                >
                  {kiosk?.refreshNeeded ? l('page.dashboard.reloadRequested') : l('page.dashboard.reloadButton')}
                </Button>
                {kiosk?.refreshNeeded && <RefreshButton onClick={update} />}
              </ButtonGroup>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{l('page.dashboard.reloadConfirmHeader')}</ModalHeader>
                  <ModalBody>{l('page.dashboard.reloadConfirmText')}</ModalBody>
                  <ModalFooter>
                    <ButtonGroup>
                      <Button onClick={reloadClient} isLoading={isLoading} variant='ghost'>
                        {l('page.dashboard.reloadConfirmButton')}
                      </Button>
                      <Button onClick={onClose}>{l('button.cancel')}</Button>
                    </ButtonGroup>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </PageSection>
          )}
        </VStack>
      </CardBody>
    </Page>
  );
}
