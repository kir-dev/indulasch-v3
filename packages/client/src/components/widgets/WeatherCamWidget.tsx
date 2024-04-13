import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Widget } from '@/layout/Widget';
import { WeatherCamConfig } from '@/types/widget.type.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

import { ImageContainer } from '../ImageContainer';

const weatherImageSrc = 'https://ha5kfu.hu/idokep/kamera.php';

export function WeatherCamWidget() {
  const [camId, setCamId] = useState(1);
  const config = useWidgetConfig<WeatherCamConfig>('weathercam');

  useEffect(() => {
    const interval = setInterval(() => {
      setCamId((prev) => (prev % 2) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const src = useMemo(() => {
    const url = new URL(weatherImageSrc);
    url.searchParams.set('id', camId.toString());
    url.searchParams.set('t', new Date().getTime().toString());
    return url.toString();
  }, [camId]);

  return (
    <Widget grid={config.grid}>
      <ContentContainer>
        <ImageContainer src={src} alt='Nem sikerült betölteni az időjárás kamera képet' />
        <SponsorText>Forrás: HA5KFU</SponsorText>
      </ContentContainer>
    </Widget>
  );
}

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const SponsorText = styled.p`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
`;
