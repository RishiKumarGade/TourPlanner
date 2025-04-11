export interface TourPlace {
  place: string;
  costperperson: string;
  detailedaddress: string;
  lattitude: string;
  longitude: string;
  whythisplace: string;
  todo: string;
  image: string;
}

export interface Chat {
  id: string;
  plan: TourPlace[];
  messages: { role: 'user' | 'assistant'; content: string }[];
  isPublic: boolean;
  images?: string[];
}