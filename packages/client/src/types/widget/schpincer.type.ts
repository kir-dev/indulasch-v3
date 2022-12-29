export type SchPincerOpening = {
  name: String;
  icon: String | undefined;
  feeling: String;
  available: number;
  outOf: number;
  banner: String | undefined;
  day: String;
  comment: String;
};

export type SchPincerDto = SchPincerOpening[];
