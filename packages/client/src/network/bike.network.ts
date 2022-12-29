import { useQuery } from 'react-query';
import axios from 'axios';
import { useConfig } from '../layout/ConfigContext';
import { QueryKeys } from '../types/misc.type';
import { BikeDto, BikePlace } from '../types/widget/bike.type';

export function useBikeQuery() {
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();

  const url = new URL('https://maps.nextbike.net/maps/nextbike-live.json');
  url.searchParams.append('city', '699');
  url.searchParams.append('domains', 'bh');

  return useQuery<BikePlace, Error>(QueryKeys.BIKE, async () => {
    const { data } = await axios.get<BikeDto>(url.toString());
    return getClosestPlace(data.countries[0].cities[0].places || [], coordinates.lat, coordinates.lon);
  });
}

function getClosestPlace(places: BikePlace[], lat: number, lon: number) {
  let bestPlace = places[0];
  let bestDistance = Infinity;
  for (let place of places) {
    let d = calculateDistance(lat, lon, place.lat, place.lng);
    if (d < bestDistance) {
      bestPlace = place;
      bestDistance = d;
    }
  }
  return bestPlace;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
}
