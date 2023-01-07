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
    <Page title={kiosk?.config.meta.name || 'Ismeretlen'}>
      <CardBody>
        {kiosk?.lastClientQuery && checkThreshold(kiosk.lastClientQuery) && (
          <Alert status='error' mb={5}>
            <AlertIcon />
            Úgy tűnik a kliens kapcsolata megszakadt a szerverrel. Elképzelhető, hogy a módosítások nem fognak
            látszódni.
          </Alert>
        )}
        <VStack spacing={5} alignItems='flex-start' textAlign='left'>
          {clientUrl && (
            <Wrap>
              <Button leftIcon={<TbBrowserPlus />} onClick={() => window.open(clientUrl)}>
                Kliens megnyitása
              </Button>
              <Button variant='ghost' leftIcon={<TbCopy />} onClick={() => navigator.clipboard.writeText(clientUrl)}>
                Kliens címének másolása
              </Button>
            </Wrap>
          )}
          <PageSection>
            <Heading size={'md'}>Kioszk azonosítója</Heading>
            <Text>{selectedKioskId}</Text>
          </PageSection>
          <PageSection>
            <HStack>
              <Heading size={'md'}>Kliens állapota</Heading>
              <RefreshButton onClick={update} />
            </HStack>
            {kiosk?.lastClientQuery && (
              <>
                <Text>A kliens utoljára ekkor frissítette a konfigurációját:</Text>
                <Text>{new Date(kiosk.lastClientQuery).toLocaleString('hu-HU')}</Text>
              </>
            )}
            <KioskStatusBadge date={kiosk?.lastClientQuery} />
          </PageSection>
          <PageSection>
            <Heading size={'md'}>Rangod ennél a kioszknál</Heading>
            <RoleBadge role={role?.role || KioskRoles.VISITOR} />
          </PageSection>
          <PageSection>
            <Heading size={'md'}>Koordináták</Heading>
            <Text>Szélességi fok: {kiosk?.config.meta.coordinates.lat}</Text>
            <Text>Hosszúsági fok: {kiosk?.config.meta.coordinates.lon}</Text>
          </PageSection>
          <PageSection>
            <Heading size={'md'}>Engedélyezett widgetek</Heading>
            {kiosk?.config.widgets.map((w) => (
              <Text key={w.name}>{WidgetDisplay[w.name].name}</Text>
            ))}
          </PageSection>
          {role && role.role >= 2 && (
            <PageSection>
              <Heading size='md'>Kliens újraindítása</Heading>
              <ButtonGroup>
                <Button isDisabled={kiosk?.refreshNeeded} leftIcon={<TbRefreshDot />} onClick={onOpen}>
                  {kiosk?.refreshNeeded ? 'Frissítés kérelmezve' : 'Újraindítás'}
                </Button>
                {kiosk?.refreshNeeded && <RefreshButton onClick={update} />}
              </ButtonGroup>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Kliens újraindítása</ModalHeader>
                  <ModalBody>
                    Újraindítás során a böngészőablak frissül és a legfrissebb kliens szoftver lesz használva. Kérlek
                    nyisd meg előtte a kliens lokálisan és győződj meg a beállítások helyességéről! Folytatod?
                  </ModalBody>
                  <ModalFooter>
                    <ButtonGroup>
                      <Button onClick={reloadClient} isLoading={isLoading} variant='ghost'>
                        Újraindít!
                      </Button>
                      <Button onClick={onClose}>Mégse</Button>
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
