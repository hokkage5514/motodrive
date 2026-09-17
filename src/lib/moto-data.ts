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
  {
    id: "ninja-h2",
    name: "Kawasaki Ninja H2",
    brand: "Kawasaki",
    type: "Спорт",
    price: 9850000,
    year: 2024,
    engine: 998,
    power: 231,
    topSpeed: 299,
    description:
      "Гипербайк с механическим нагнетателем: зеркально-чёрный кузов, трубчатая рама, взрывное ускорение и характерный свист компрессора. Техника не для новичков.",
    image: ninjaH2,
    popular: true,
  },
  {
    id: "panigale-v4s",
    name: "Ducati Panigale V4 S",
    brand: "Ducati",
    type: "Спорт",
    price: 8650000,
    year: 2024,
    engine: 1103,
    power: 216,
    topSpeed: 299,
    description:
      "Флагманский суперспорт с двигателем Desmosedici Stradale, аэродинамическими крыльями, полуактивной подвеской Öhlins и электроникой из мира MotoGP.",
    image: panigaleV4,
    popular: true,
  },
  {
    id: "m1000rr",
    name: "BMW M 1000 RR",
    brand: "BMW",
    type: "Спорт",
    price: 9450000,
    year: 2024,
    engine: 999,
    power: 218,
    topSpeed: 306,
    description:
      "Омологационный трековый снаряд: карбоновые обвес и колёса, крылья с высокой прижимной силой, тормоза Nissin и мотор ShiftCam, раскрученный до 218 л.с.",
    image: m1000rr,
  },
  {
    id: "s1000rr",
    name: "BMW S 1000 RR",
    brand: "BMW",
    type: "Спорт",
    price: 6350000,
    year: 2023,
    engine: 999,
    power: 210,
    topSpeed: 303,
    description:
      "Эталонный литровый суперспорт: лёгкая рама Flex Frame, ShiftCam с широкой полкой тяги, режимы езды Pro и точная обратная связь на треке и в дороге.",
    image: s1000rr,
    popular: true,
  },
  {
    id: "cbr1000rr-r",
    name: "Honda CBR1000RR-R Fireblade",
    brand: "Honda",
    type: "Спорт",
    price: 7250000,
    year: 2024,
    engine: 1000,
    power: 217,
    topSpeed: 299,
    description:
      "Гоночная Fireblade в раскраске HRC: аэродинамика от RC213V, шатуны с титановыми деталями, короткая база и настройки, заточенные под круговое время.",
    image: fireblade,
  },
  {
    id: "rsv4-1100-factory",
    name: "Aprilia RSV4 1100 Factory",
    brand: "Aprilia",
    type: "Спорт",
    price: 7890000,
    year: 2024,
    engine: 1099,
    power: 220,
    topSpeed: 305,
    description:
      "Итальянский V4 с открытым характером: кованые колёса, электронная подвеска Öhlins Smart EC, регулируемая геометрия рамы и один из лучших саундтреков.",
    image: rsv4,
  },
  {
    id: "ninja-zx10r",
    name: "Kawasaki Ninja ZX-10R",
    brand: "Kawasaki",
    type: "Спорт",
    price: 5390000,
    year: 2023,
    engine: 998,
    power: 203,
    topSpeed: 299,
    description:
      "Многократный чемпион WSBK в серийном исполнении: точная передняя часть, квикшифтер в обе стороны, электронный контроль тяги KTRC и узнаваемая зелёная ливрея.",
    image: zx10r,
  },
  {
    id: "gsxr1000r",
    name: "Suzuki GSX-R1000R",
    brand: "Suzuki",
    type: "Спорт",
    price: 4980000,
    year: 2023,
    engine: 1000,
    power: 195,
    topSpeed: 299,
    description:
      "Классический GSX-R с системой переменных фаз, подвеской Showa Balance Free, лёгким запуском с места и понятным характером на любых скоростях.",
    image: gsxr1000,
  },
  {
    id: "hayabusa",
    name: "Suzuki Hayabusa",
    brand: "Suzuki",
    type: "Турер",
    price: 4750000,
    year: 2024,
    engine: 1340,
    power: 187,
    topSpeed: 299,
    description:
      "Легендарный гипер-спорт-турер: обтекаемый кузов, огромная тяга на любых оборотах, комфортная посадка и уверенность на дальних трассовых перегонах.",
    image: hayabusa,
    popular: true,
  },
  {
    id: "streetfighter-v4s",
    name: "Ducati Streetfighter V4 S",
    brand: "Ducati",
    type: "Нейкед",
    price: 7690000,
    year: 2024,
    engine: 1103,
    power: 208,
    topSpeed: 290,
    description:
      "Panigale без обтекателя: тот же V4, широкий руль, биплановые крылья и злая посадка. Максимум эмоций на городских улицах и извилистых дорогах.",
    image: streetfighterV4,
  },
];

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(Math.round(value))} ₽`;
}
