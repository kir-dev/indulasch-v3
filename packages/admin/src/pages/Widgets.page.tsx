import { Button, ButtonGroup, CardBody, CardFooter, FormErrorMessage, HStack, Input, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { TbChevronLeft, TbChevronRight, TbCirclePlus, TbCopy, TbTrash } from 'react-icons/tb';

import { WidgetGrid } from '../components/widget/WidgetGrid';
import { useKioskContext } from '../context/kiosk.context';
import { Page } from '../layout/Page';
import { useSaveKiosk } from '../network/useSaveKiosk.network';
import { WidgetConfig } from '../types/kiosk.types';
import { l } from '../utils/language';

export function WidgetsPage() {
  const { kiosk, update, selectedKioskId } = useKioskContext();
  const { isLoading, isError, makeRequest } = useSaveKiosk(selectedKioskId || '');
  const initialPages = useMemo(() => {
    if (kiosk?.config.pages && kiosk.config.pages.length > 0) return kiosk.config.pages;
    const widgets = kiosk?.config.widgets || [];
    return [{ durationSec: 10, widgets }];
  }, [kiosk]);

  const [pages, setPages] = useState(initialPages);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setPages(initialPages);
    setSelected((prev) => Math.min(prev, initialPages.length - 1));
  }, [initialPages]);

  const setWidgets = (widgets: WidgetConfig[]) => {
    pages[selected] = { ...pages[selected], widgets };
    setPages([...pages]);
  };

  const addPage = () => {
    setPages([...pages, { durationSec: 10, widgets: [] }]);
    setSelected(pages.length);
  };

  const removePage = () => {
    if (pages.length <= 1) return;
    const newPages = pages.filter((_, idx) => idx !== selected);
    setPages(newPages);
    setSelected(Math.max(0, selected - 1));
  };

  const setDuration = (v: number) => {
    pages[selected] = { ...pages[selected], durationSec: v };
    setPages([...pages]);
  };

  const setTitle = (title: string) => {
    pages[selected] = { ...pages[selected], title };
    setPages([...pages]);
  };

  const duplicatePage = () => {
    const current = pages[selected];
    const cloned = {
      durationSec: current.durationSec,
      title: current.title ? `${current.title} (másolat)` : undefined,
      widgets: JSON.parse(JSON.stringify(current.widgets)),
    } as typeof current;
    const newPages = [...pages.slice(0, selected + 1), cloned, ...pages.slice(selected + 1)];
    setPages(newPages);
    setSelected(selected + 1);
  };

  const prevPage = () => setSelected((p) => Math.max(0, p - 1));
  const nextPage = () => setSelected((p) => Math.min(pages.length - 1, p + 1));

  const onSave = () => {
    makeRequest({ pages }, update);
  };
  return (
    <Page title={l('title.widgets')} isLoading={isLoading}>
      <CardBody>
        <HStack justifyContent='space-between' mb={3} flexWrap='wrap'>
          <HStack>
            <Button size='sm' leftIcon={<TbCirclePlus />} onClick={addPage}>
              {l('button.add')} oldal
            </Button>
            <Button
              size='sm'
              colorScheme='red'
              leftIcon={<TbTrash />}
              onClick={removePage}
              isDisabled={pages.length <= 1}
            >
              Oldal törlése
            </Button>
            <Button size='sm' leftIcon={<TbCopy />} onClick={duplicatePage} isDisabled={pages.length < 1}>
              Oldal duplikálása
            </Button>
          </HStack>
          <HStack>
            <Button
              size='sm'
              variant='outline'
              onClick={prevPage}
              leftIcon={<TbChevronLeft />}
              isDisabled={selected === 0}
            >
              Előző
            </Button>
            <Text>Oldal:</Text>
            <Input
              type='number'
              min={1}
              max={pages.length}
              value={selected + 1}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setSelected(0);
                } else {
                  const v = parseInt(value, 10);
                  if (!Number.isNaN(v)) setSelected(Math.min(Math.max(0, v - 1), pages.length - 1));
                }
              }}
              width='4rem'
            />
            <Button
              size='sm'
              variant='outline'
              onClick={nextPage}
              rightIcon={<TbChevronRight />}
              isDisabled={selected >= pages.length - 1}
            >
              Következő
            </Button>
            <Text>Időtartam (s):</Text>
            <Input
              type='number'
              min={1}
              value={pages[selected]?.durationSec || 10}
              onChange={(e) => {
                const v = Number(e.target.value);
                setDuration(Number.isNaN(v) ? 10 : Math.max(1, v));
              }}
              width='6rem'
            />
            <Text>Cím:</Text>
            <Input
              placeholder='Oldal címe'
              value={pages[selected]?.title || ''}
              onChange={(e) => setTitle(e.target.value)}
              width='12rem'
            />
          </HStack>
        </HStack>
        <WidgetGrid widgets={pages[selected]?.widgets || []} onChange={setWidgets} />
        {isError && <FormErrorMessage>{l('error.save')}</FormErrorMessage>}
      </CardBody>
      <CardFooter>
        <ButtonGroup justifyContent='space-between' w='100%'>
          <Button isLoading={isLoading} onClick={onSave}>
            {l('button.save')}
          </Button>
          {/*<Button onClick={() => setWidgets(kiosk?.config.widgets)} variant='link'>*/}
          {/*  Módosítások elvetése*/}
          {/*</Button>*/}
        </ButtonGroup>
      </CardFooter>
    </Page>
  );
}
