export type NigeriaLGA = {
  name: string;
  slug: string;
};

export type NigeriaState = {
  name: string;
  slug: string;
  zone?: string;
  lgas: NigeriaLGA[];
  majorCities?: string[];
};

export const nigeriaStates: NigeriaState[] = [
  {
    name: "Abia",
    slug: "abia",
    zone: "South East",
    lgas: [
      { name: "Aba North", slug: "aba-north" },
      { name: "Aba South", slug: "aba-south" },
      { name: "Arochukwu", slug: "arochukwu" },
      { name: "Bende", slug: "bende" },
      { name: "Umuahia North", slug: "umuahia-north" },
      { name: "Umuahia South", slug: "umuahia-south" }
    ],
    majorCities: ["Aba", "Umuahia", "Ohafia"]
  },
  {
    name: "Adamawa",
    slug: "adamawa",
    zone: "North East",
    lgas: [
      { name: "Demsa", slug: "demsa" },
      { name: "Fufore", slug: "fufore" },
      { name: "Ganye", slug: "ganye" },
      { name: "Girei", slug: "girei" },
      { name: "Mubi North", slug: "mubi-north" },
      { name: "Yola North", slug: "yola-north" },
      { name: "Yola South", slug: "yola-south" }
    ],
    majorCities: ["Yola", "Mubi", "Jimeta"]
  },
  {
    name: "Akwa Ibom",
    slug: "akwa-ibom",
    zone: "South South",
    lgas: [
      { name: "Eket", slug: "eket" },
      { name: "Ikot Ekpene", slug: "ikot-ekpene" },
      { name: "Oron", slug: "oron" },
      { name: "Uyo", slug: "uyo" },
      { name: "Abak", slug: "abak" },
      { name: "Itu", slug: "itu" }
    ],
    majorCities: ["Uyo", "Eket", "Ikot Ekpene"]
  },
  {
    name: "Anambra",
    slug: "anambra",
    zone: "South East",
    lgas: [
      { name: "Awka North", slug: "awka-north" },
      { name: "Awka South", slug: "awka-south" },
      { name: "Onitsha North", slug: "onitsha-north" },
      { name: "Onitsha South", slug: "onitsha-south" },
      { name: "Nnewi North", slug: "nnewi-north" },
      { name: "Nnewi South", slug: "nnewi-south" }
    ],
    majorCities: ["Onitsha", "Awka", "Nnewi"]
  },
  {
    name: "Bauchi",
    slug: "bauchi",
    zone: "North East",
    lgas: [
      { name: "Alkaleri", slug: "alkaleri" },
      { name: "Bauchi", slug: "bauchi-lga" },
      { name: "Katagum", slug: "katagum" },
      { name: "Misau", slug: "misau" },
      { name: "Toro", slug: "toro" }
    ],
    majorCities: ["Bauchi", "Azare", "Misau"]
  },
  {
    name: "Bayelsa",
    slug: "bayelsa",
    zone: "South South",
    lgas: [
      { name: "Brass", slug: "brass" },
      { name: "Ekeremor", slug: "ekeremor" },
      { name: "Kolokuma/Opokuma", slug: "kolokuma-opokuma" },
      { name: "Nembe", slug: "nembe" },
      { name: "Ogbia", slug: "ogbia" },
      { name: "Yenagoa", slug: "yenagoa" }
    ],
    majorCities: ["Yenagoa", "Ogbia", "Brass"]
  },
  {
    name: "Benue",
    slug: "benue",
    zone: "North Central",
    lgas: [
      { name: "Gboko", slug: "gboko" },
      { name: "Katsina-Ala", slug: "katsina-ala" },
      { name: "Makurdi", slug: "makurdi" },
      { name: "Otukpo", slug: "otukpo" },
      { name: "Vandeikya", slug: "vandeikya" }
    ],
    majorCities: ["Makurdi", "Gboko", "Otukpo"]
  },
  {
    name: "Borno",
    slug: "borno",
    zone: "North East",
    lgas: [
      { name: "Bama", slug: "bama" },
      { name: "Biu", slug: "biu" },
      { name: "Gwoza", slug: "gwoza" },
      { name: "Jere", slug: "jere" },
      { name: "Maiduguri", slug: "maiduguri" }
    ],
    majorCities: ["Maiduguri", "Biu", "Bama"]
  },
  {
    name: "Cross River",
    slug: "cross-river",
    zone: "South South",
    lgas: [
      { name: "Calabar Municipal", slug: "calabar-municipal" },
      { name: "Calabar South", slug: "calabar-south" },
      { name: "Ikom", slug: "ikom" },
      { name: "Obudu", slug: "obudu" },
      { name: "Ogoja", slug: "ogoja" }
    ],
    majorCities: ["Calabar", "Ikom", "Ogoja"]
  },
  {
    name: "Delta",
    slug: "delta",
    zone: "South South",
    lgas: [
      { name: "Asaba", slug: "asaba" },
      { name: "Oshimili South", slug: "oshimili-south" },
      { name: "Uvwie", slug: "uvwie" },
      { name: "Warri South", slug: "warri-south" },
      { name: "Ughelli North", slug: "ughelli-north" }
    ],
    majorCities: ["Asaba", "Warri", "Ughelli"]
  },
  {
    name: "Ebonyi",
    slug: "ebonyi",
    zone: "South East",
    lgas: [
      { name: "Abakaliki", slug: "abakaliki" },
      { name: "Afikpo North", slug: "afikpo-north" },
      { name: "Afikpo South", slug: "afikpo-south" },
      { name: "Ezza North", slug: "ezza-north" },
      { name: "Ikwo", slug: "ikwo" }
    ],
    majorCities: ["Abakaliki", "Afikpo", "Onueke"]
  },
  {
    name: "Edo",
    slug: "edo",
    zone: "South South",
    lgas: [
      { name: "Akoko-Edo", slug: "akoko-edo" },
      { name: "Egor", slug: "egor" },
      { name: "Esan North-East", slug: "esan-north-east" },
      { name: "Esan West", slug: "esan-west" },
      { name: "Oredo", slug: "oredo" },
      { name: "Ikpoba-Okha", slug: "ikpoba-okha" }
    ],
    majorCities: ["Benin City", "Uromi", "Ekpoma", "Auchi"]
  },
  {
    name: "Ekiti",
    slug: "ekiti",
    zone: "South West",
    lgas: [
      { name: "Ado-Ekiti", slug: "ado-ekiti" },
      { name: "Efon", slug: "efon" },
      { name: "Ekiti West", slug: "ekiti-west" },
      { name: "Ikere", slug: "ikere" },
      { name: "Oye", slug: "oye" }
    ],
    majorCities: ["Ado-Ekiti", "Ikere-Ekiti", "Oye-Ekiti"]
  },
  {
    name: "Enugu",
    slug: "enugu",
    zone: "South East",
    lgas: [
      { name: "Enugu East", slug: "enugu-east" },
      { name: "Enugu North", slug: "enugu-north" },
      { name: "Enugu South", slug: "enugu-south" },
      { name: "Nsukka", slug: "nsukka" },
      { name: "Oji River", slug: "oji-river" },
      { name: "Udi", slug: "udi" }
    ],
    majorCities: ["Enugu", "Nsukka", "Oji River"]
  },
  {
    name: "FCT",
    slug: "fct",
    zone: "North Central",
    lgas: [
      { name: "Abaji", slug: "abaji" },
      { name: "Bwari", slug: "bwari" },
      { name: "Gwagwalada", slug: "gwagwalada" },
      { name: "Kuje", slug: "kuje" },
      { name: "Kwali", slug: "kwali" },
      { name: "Municipal Area Council (AMAC)", slug: "amac" }
    ],
    majorCities: ["Abuja", "Garki", "Wuse", "Maitama", "Gwarinpa", "Kubwa"]
  },
  {
    name: "Gombe",
    slug: "gombe",
    zone: "North East",
    lgas: [
      { name: "Akko", slug: "akko" },
      { name: "Balanga", slug: "balanga" },
      { name: "Billiri", slug: "billiri" },
      { name: "Dukku", slug: "dukku" },
      { name: "Gombe", slug: "gombe-lga" }
    ],
    majorCities: ["Gombe", "Kaltungo", "Dukku"]
  },
  {
    name: "Imo",
    slug: "imo",
    zone: "South East",
    lgas: [
      { name: "Ehime Mbano", slug: "ehime-mbano" },
      { name: "Mbaise", slug: "mbaise" },
      { name: "Orlu", slug: "orlu" },
      { name: "Owerri Municipal", slug: "owerri-municipal" },
      { name: "Owerri North", slug: "owerri-north" },
      { name: "Owerri West", slug: "owerri-west" }
    ],
    majorCities: ["Owerri", "Orlu", "Okigwe"]
  },
  {
    name: "Jigawa",
    slug: "jigawa",
    zone: "North West",
    lgas: [
      { name: "Babura", slug: "babura" },
      { name: "Dutse", slug: "dutse" },
      { name: "Hadejia", slug: "hadejia" },
      { name: "Kazaure", slug: "kazaure" },
      { name: "Ringim", slug: "ringim" }
    ],
    majorCities: ["Dutse", "Hadejia", "Kazaure"]
  },
  {
    name: "Kaduna",
    slug: "kaduna",
    zone: "North West",
    lgas: [
      { name: "Birnin Gwari", slug: "birnin-gwari" },
      { name: "Chikun", slug: "chikun" },
      { name: "Giwa", slug: "giwa" },
      { name: "Igabi", slug: "igabi" },
      { name: "Ikara", slug: "ikara" },
      { name: "Jaba", slug: "jaba" },
      { name: "Jema'a", slug: "jemaa" },
      { name: "Kachia", slug: "kachia" },
      { name: "Kaduna North", slug: "kaduna-north" },
      { name: "Kaduna South", slug: "kaduna-south" },
      { name: "Kagarko", slug: "kagarko" },
      { name: "Kajuru", slug: "kajuru" },
      { name: "Kaura", slug: "kaura" },
      { name: "Kauru", slug: "kauru" },
      { name: "Kubau", slug: "kubau" },
      { name: "Kudan", slug: "kudan" },
      { name: "Lere", slug: "lere" },
      { name: "Makarfi", slug: "makarfi" },
      { name: "Sabon Gari", slug: "sabon-gari" },
      { name: "Sanga", slug: "sanga" },
      { name: "Soba", slug: "soba" },
      { name: "Zangon Kataf", slug: "zangon-kataf" },
      { name: "Zaria", slug: "zaria" }
    ],
    majorCities: ["Kaduna", "Zaria", "Kafanchan"]
  },
  {
    name: "Kano",
    slug: "kano",
    zone: "North West",
    lgas: [
      { name: "Fagge", slug: "fagge" },
      { name: "Gwale", slug: "gwale" },
      { name: "Kano Municipal", slug: "kano-municipal" },
      { name: "Nasarawa", slug: "nasarawa-kano" },
      { name: "Tarauni", slug: "tarauni" },
      { name: "Dala", slug: "dala" },
      { name: "Ungogo", slug: "ungogo" },
      { name: "Kumbotso", slug: "kumbotso" },
      { name: "Bichi", slug: "bichi" },
      { name: "Rano", slug: "rano" },
      { name: "Doguwa", slug: "doguwa" }
    ],
    majorCities: ["Kano", "Bichi", "Wudil", "Rano"]
  },
  {
    name: "Katsina",
    slug: "katsina",
    zone: "North West",
    lgas: [
      { name: "Daura", slug: "daura" },
      { name: "Funtua", slug: "funtua" },
      { name: "Katsina", slug: "katsina-lga" },
      { name: "Malumfashi", slug: "malumfashi" },
      { name: "Mani", slug: "mani" }
    ],
    majorCities: ["Katsina", "Daura", "Funtua"]
  },
  {
    name: "Kebbi",
    slug: "kebbi",
    zone: "North West",
    lgas: [
      { name: "Argungu", slug: "argungu" },
      { name: "Birnin Kebbi", slug: "birnin-kebbi" },
      { name: "Gwandu", slug: "gwandu" },
      { name: "Jega", slug: "jega" },
      { name: "Yauri", slug: "yauri" }
    ],
    majorCities: ["Birnin Kebbi", "Argungu", "Yauri"]
  },
  {
    name: "Kogi",
    slug: "kogi",
    zone: "North Central",
    lgas: [
      { name: "Adavi", slug: "adavi" },
      { name: "Ankpa", slug: "ankpa" },
      { name: "Idah", slug: "idah" },
      { name: "Kabba/Bunu", slug: "kabba-bunu" },
      { name: "Lokoja", slug: "lokoja" },
      { name: "Okene", slug: "okene" }
    ],
    majorCities: ["Lokoja", "Okene", "Ankpa", "Kabba"]
  },
  {
    name: "Kwara",
    slug: "kwara",
    zone: "North Central",
    lgas: [
      { name: "Asa", slug: "asa" },
      { name: "Baruten", slug: "baruten" },
      { name: "Edu", slug: "edu" },
      { name: "Ilorin East", slug: "ilorin-east" },
      { name: "Ilorin South", slug: "ilorin-south" },
      { name: "Ilorin West", slug: "ilorin-west" },
      { name: "Offa", slug: "offa" }
    ],
    majorCities: ["Ilorin", "Offa", "Omu-Aran"]
  },
  {
    name: "Lagos",
    slug: "lagos",
    zone: "South West",
    lgas: [
      { name: "Agege", slug: "agege" },
      { name: "Alimosho", slug: "alimosho" },
      { name: "Amuwo-Odofin", slug: "amuwo-odofin" },
      { name: "Apapa", slug: "apapa" },
      { name: "Badagry", slug: "badagry" },
      { name: "Epe", slug: "epe" },
      { name: "Eti-Osa", slug: "eti-osa" },
      { name: "Ibeju-Lekki", slug: "ibeju-lekki" },
      { name: "Ifako-Ijaiye", slug: "ifako-ijaiye" },
      { name: "Ikeja", slug: "ikeja" },
      { name: "Ikorodu", slug: "ikorodu" },
      { name: "Kosofe", slug: "kosofe" },
      { name: "Lagos Island", slug: "lagos-island" },
      { name: "Lagos Mainland", slug: "lagos-mainland" },
      { name: "Mushin", slug: "mushin" },
      { name: "Ojo", slug: "ojo" },
      { name: "Oshodi-Isolo", slug: "oshodi-isolo" },
      { name: "Shomolu", slug: "shomolu" },
      { name: "Surulere", slug: "surulere" }
    ],
    majorCities: ["Lagos", "Ikeja", "Ikorodu", "Epe", "Badagry"]
  },
  {
    name: "Nasarawa",
    slug: "nasarawa",
    zone: "North Central",
    lgas: [
      { name: "Akwanga", slug: "akwanga" },
      { name: "Keffi", slug: "keffi" },
      { name: "Lafia", slug: "lafia" },
      { name: "Nasarawa", slug: "nasarawa-lga" },
      { name: "Karu", slug: "karu" }
    ],
    majorCities: ["Lafia", "Karu", "Keffi"]
  },
  {
    name: "Niger",
    slug: "niger",
    zone: "North Central",
    lgas: [
      { name: "Bida", slug: "bida" },
      { name: "Chanchaga", slug: "chanchaga" },
      { name: "Kontagora", slug: "kontagora" },
      { name: "Mokwa", slug: "mokwa" },
      { name: "Suleja", slug: "suleja" }
    ],
    majorCities: ["Minna", "Bida", "Suleja", "Kontagora"]
  },
  {
    name: "Ogun",
    slug: "ogun",
    zone: "South West",
    lgas: [
      { name: "Abeokuta North", slug: "abeokuta-north" },
      { name: "Abeokuta South", slug: "abeokuta-south" },
      { name: "Ijebu Ode", slug: "ijebu-ode" },
      { name: "Obafemi Owode", slug: "obafemi-owode" },
      { name: "Ado-Odo/Ota", slug: "ado-odo-ota" },
      { name: "Sagamu", slug: "sagamu" }
    ],
    majorCities: ["Abeokuta", "Ijebu-Ode", "Ota", "Sagamu"]
  },
  {
    name: "Ondo",
    slug: "ondo",
    zone: "South West",
    lgas: [
      { name: "Akoko South-East", slug: "akoko-south-east" },
      { name: "Akure North", slug: "akure-north" },
      { name: "Akure South", slug: "akure-south" },
      { name: "Ondo West", slug: "ondo-west" },
      { name: "Owo", slug: "owo" }
    ],
    majorCities: ["Akure", "Ondo City", "Owo"]
  },
  {
    name: "Osun",
    slug: "osun",
    zone: "South West",
    lgas: [
      { name: "Ede North", slug: "ede-north" },
      { name: "Ife Central", slug: "ife-central" },
      { name: "Ilesa East", slug: "ilesa-east" },
      { name: "Osogbo", slug: "osogbo" },
      { name: "Iwo", slug: "iwo" }
    ],
    majorCities: ["Osogbo", "Ile-Ife", "Ilesa", "Iwo"]
  },
  {
    name: "Oyo",
    slug: "oyo",
    zone: "South West",
    lgas: [
      { name: "Ibadan North", slug: "ibadan-north" },
      { name: "Ibadan North-East", slug: "ibadan-north-east" },
      { name: "Ibadan North-West", slug: "ibadan-north-west" },
      { name: "Ibadan South-East", slug: "ibadan-south-east" },
      { name: "Ibadan South-West", slug: "ibadan-south-west" },
      { name: "Ogbomosho North", slug: "ogbomosho-north" },
      { name: "Ogbomosho South", slug: "ogbomosho-south" },
      { name: "Oyo West", slug: "oyo-west" }
    ],
    majorCities: ["Ibadan", "Ogbomosho", "Oyo", "Saki"]
  },
  {
    name: "Plateau",
    slug: "plateau",
    zone: "North Central",
    lgas: [
      { name: "Barkin Ladi", slug: "barkin-ladi" },
      { name: "Jos North", slug: "jos-north" },
      { name: "Jos South", slug: "jos-south" },
      { name: "Pankshin", slug: "pankshin" },
      { name: "Shendam", slug: "shendam" }
    ],
    majorCities: ["Jos", "Bukuru", "Pankshin"]
  },
  {
    name: "Rivers",
    slug: "rivers",
    zone: "South South",
    lgas: [
      { name: "Eleme", slug: "eleme" },
      { name: "Obio/Akpor", slug: "obio-akpor" },
      { name: "Port Harcourt", slug: "port-harcourt-lga" },
      { name: "Bonny", slug: "bonny" },
      { name: "Degema", slug: "degema" }
    ],
    majorCities: ["Port Harcourt", "Obio-Akpor", "Bonny"]
  },
  {
    name: "Sokoto",
    slug: "sokoto",
    zone: "North West",
    lgas: [
      { name: "Gwadabawa", slug: "gwadabawa" },
      { name: "Sokoto North", slug: "sokoto-north" },
      { name: "Sokoto South", slug: "sokoto-south" },
      { name: "Wamako", slug: "wamako" },
      { name: "Wurno", slug: "wurno" }
    ],
    majorCities: ["Sokoto", "Wamako"]
  },
  {
    name: "Taraba",
    slug: "taraba",
    zone: "North East",
    lgas: [
      { name: "Bali", slug: "bali" },
      { name: "Gashaka", slug: "gashaka" },
      { name: "Jalingo", slug: "jalingo" },
      { name: "Sardauna", slug: "sardauna" },
      { name: "Wukari", slug: "wukari" }
    ],
    majorCities: ["Jalingo", "Wukari", "Gembu"]
  },
  {
    name: "Yobe",
    slug: "yobe",
    zone: "North East",
    lgas: [
      { name: "Bade", slug: "bade" },
      { name: "Damaturu", slug: "damaturu" },
      { name: "Fika", slug: "fika" },
      { name: "Gashua", slug: "gashua" },
      { name: "Potiskum", slug: "potiskum" }
    ],
    majorCities: ["Damaturu", "Potiskum", "Gashua"]
  },
  {
    name: "Zamfara",
    slug: "zamfara",
    zone: "North West",
    lgas: [
      { name: "Anka", slug: "anka" },
      { name: "Gusau", slug: "gusau" },
      { name: "Kaura Namoda", slug: "kaura-namoda" },
      { name: "Maradun", slug: "maradun" },
      { name: "Talata Mafara", slug: "talata-mafara" }
    ],
    majorCities: ["Gusau", "Kaura Namoda", "Talata Mafara"]
  }
];

export const getLGAsByState = (stateNameOrSlug: string): NigeriaLGA[] => {
  const normalized = stateNameOrSlug.toLowerCase().trim();
  const found = nigeriaStates.find(
    (s) => s.name.toLowerCase() === normalized || s.slug === normalized
  );
  return found ? found.lgas : [];
};
