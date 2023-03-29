export type SchPincerOpening = {
  name: string;
  icon: string | undefined;
  feeling: string;
  available: number;
  outOf: number;
  banner: string | undefined;
  day: string;
  comment: string;
};

export type SchPincerDto = SchPincerOpening[];
