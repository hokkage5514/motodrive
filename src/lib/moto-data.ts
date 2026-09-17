import sportRed from "@/assets/moto-sport-red.jpg";
import nakedBlack from "@/assets/moto-naked-black.jpg";
import enduroOrange from "@/assets/moto-enduro-orange.jpg";
import cruiserBlue from "@/assets/moto-cruiser-blue.jpg";
import tourerSilver from "@/assets/moto-tourer-silver.jpg";
import sportGreen from "@/assets/moto-sport-green.jpg";
import nakedYellow from "@/assets/moto-naked-yellow.jpg";
import advWhite from "@/assets/moto-adventure-white.jpg";
import ninjaH2 from "@/assets/moto-ninja-h2.jpg";
import panigaleV4 from "@/assets/moto-panigale-v4.jpg";
import m1000rr from "@/assets/moto-m1000rr.jpg";
import s1000rr from "@/assets/moto-s1000rr.jpg";
import fireblade from "@/assets/moto-fireblade.jpg";
import rsv4 from "@/assets/moto-rsv4.jpg";
import zx10r from "@/assets/moto-zx10r.jpg";
import gsxr1000 from "@/assets/moto-gsxr1000.jpg";
import hayabusa from "@/assets/moto-hayabusa.jpg";
import streetfighterV4 from "@/assets/moto-streetfighter-v4.jpg";

export const MOTO_TYPES = ["Спорт", "Нейкед", "Эндуро", "Круизер", "Турер"] as const;
export type MotoType = (typeof MOTO_TYPES)[number];

export interface Moto {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  year: number;
  engine: number;
  power: number;
  topSpeed: number;
  description: string;
  image: string;
  popular?: boolean;
}

export interface MotoRequest {
  id: string;
  name: string;
  phone: string;
  moto: string;
  comment: string;
  createdAt: string;
}

export const seedMotos: Moto[] = [
  {
    id: "yzf-r1",
    name: "Yamaha YZF-R1",
    brand: "Yamaha",
    type: "Спорт",
    price: 4290000,
    year: 2024,
    engine: 998,
    power: 200,
    topSpeed: 299,
    description:
      "Литровый супербайк с рядным четырёхцилиндровым двигателем crossplane, электронным управлением тягой и полностью регулируемой подвеской. Создан для трека, но уверенно чувствует себя и на шоссе.",
    image: sportRed,
    popular: true,
  },
  {
    id: "cb650r-black",
    name: "Honda CB650R Black Edition",
    brand: "Honda",
    type: "Нейкед",
    price: 2190000,
    year: 2023,
    engine: 649,
    power: 95,
    topSpeed: 215,
    description:
      "Городской нейкед в стиле neo sports café: матовый чёрный кузов, круглая LED-оптика, ровная тяга на средних оборотах и лёгкое управление в плотном потоке.",
    image: nakedBlack,
    popular: true,
  },
  {
    id: "690-adventure-r",
    name: "KTM 690 Adventure R",
    brand: "KTM",
    type: "Эндуро",
    price: 2680000,
    year: 2024,
    engine: 693,
    power: 74,
    topSpeed: 190,
    description:
      "Настоящий турэндуро: длинноходная подвеска WP, спицованные колёса, защита двигателя и внедорожная резина. Одинаково хорош на грунте и в дальней дороге.",
    image: enduroOrange,
    popular: true,
  },
  {
    id: "softail-classic",
    name: "Harley-Davidson Softail Classic",
    brand: "Harley-Davidson",
    type: "Круизер",
    price: 3950000,
    year: 2022,
    engine: 1690,
    power: 78,
    topSpeed: 175,
    description:
      "Классический круизер с V-твином, хромированной отделкой, низким седлом и широким рулём. Неспешный характер, глубокий звук и максимальный комфорт на прямых.",
    image: cruiserBlue,
  },
  {
    id: "tracer-9-gt",
    name: "Yamaha Tracer 9 GT",
    brand: "Yamaha",
    type: "Турер",
    price: 3120000,
    year: 2024,
    engine: 890,
    power: 119,
    topSpeed: 235,
    description:
      "Спорт-турер с трёхцилиндровым двигателем CP3, полукомплектом кофров, регулируемым ветровым стеклом и электронной подвеской. Идеален для дальних поездок вдвоём.",
    image: tourerSilver,
    popular: true,
  },
  {
    id: "ninja-zx6r",
    name: "Kawasaki Ninja ZX-6R",
    brand: "Kawasaki",
    type: "Спорт",
    price: 2870000,
    year: 2023,
    engine: 636,
    power: 130,
    topSpeed: 260,
    description:
      "Легендарный суперспорт среднего класса: высокооборотистый мотор, острая геометрия рамы, быстрый квикшифтер и узнаваемая зелёная раскраска Ninja.",
    image: sportGreen,
  },
  {
    id: "z650-yellow",
    name: "Kawasaki Z650",
    brand: "Kawasaki",
    type: "Нейкед",
    price: 1690000,
    year: 2024,
    engine: 649,
    power: 68,
    topSpeed: 205,
    description:
      "Компактный роадстер с малым весом и низким седлом — отличный первый мотоцикл. Живая тяга с самых низов, дружелюбное управление, экономичный расход.",
    image: nakedYellow,
  },
  {
    id: "r1250gs-adventure",
    name: "BMW R 1250 GS Adventure",
    brand: "BMW",
    type: "Турер",
    price: 5480000,
    year: 2023,
    engine: 1254,
    power: 136,
    topSpeed: 220,
    description:
      "Флагманский тяжёлый турэндуро с оппозитным двигателем ShiftCam, алюминиевыми кофрами, огромным запасом хода и полным набором электронных помощников.",
    image: advWhite,
  },
];

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(Math.round(value))} ₽`;
}
