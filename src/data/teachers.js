const teachers = [
  {
    name: "Vít Martin, Mgr.",
    role: "Učitel hudebního oboru",
    subjects: ["bicí", "kytara", "klavír", "el. klávesy", "hudební nauka"],
    email: "m.vit@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Kostomlatská Olga, Dipl. um.",
    role: "Učitel hudebního oboru",
    subjects: ["zpěv", "hudební nauka"],
    email: "o.kostomlatska@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Pospíšil Jiří",
    role: "Učitel hudebního oboru",
    subjects: ["zob. flétna", "klarinet", "saxofon", "kytara"],
    email: "j.pospisil@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Tomišková Helena",
    role: "Učitel hudebního oboru",
    status: "v současné době na mateřské dovolené",
    email: "h.tomiskova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Pejřilová Veronika",
    role: "Učitel hudebního oboru",
    subjects: ["příčná flétna", "zobcová flétna"],
    email: "v.pejrilova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Franková Bohumila",
    role: "Učitel hudebního oboru",
    subjects: ["kytara", "klávesy", "zobcová flétna"],
    email: "b.frankova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Kyncl Lukáš",
    role: "Učitel hudebního oboru",
    subjects: ["dřevěné dechové nástroje"],
    email: "l.kyncl@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Menoušek Radek, Dr.",
    role: "Učitel hudebního oboru",
    subjects: [
      "klavír",
      "el. klávesy",
      "zpěv",
      "zob. flétna",
      "dechové žesťové nástroje",
      "hudební nauka",
      "soubory",
      "základy souhry"
    ],
    email: "r.menousek@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Rais Karel",
    role: "Učitel hudebního oboru",
    subjects: ["housle"],
    email: "k.rais@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Hájek Jaroslav",
    role: "Učitel hudebního oboru",
    subjects: ["bicí", "kytara", "soubory"],
    email: "j.hajek@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Jinochová Iveta, Mgr.",
    role: "Učitel hudebního oboru",
    subjects: ["klavír", "el. klávesy"],
    email: "i.jinochova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Křížová Stanislava",
    role: "Učitel hudebního oboru",
    subjects: ["klavír"],
    email: "s.krizova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Syrová Romana, Mgr.",
    role: "Učitel hudebního oboru",
    subjects: ["klavír", "el. klávesy", "zob. flétna", "hudební nauka"],
    email: "r.syrova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Eva Pilařová, Dis.",
    role: "Učitel hudebního oboru",
    subjects: ["violoncello", "kontrabas"],
    email: "e.pilarova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Pavel Starý",
    role: "Učitel hudebního oboru",
    subjects: ["trubka", "baskřídlovka", "zobcová flétna", "orchestrální hra"],
    email: "pavel.stary@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Jana Pirklová, Mgr.",
    role: "Učitel výtvarného oboru",
    email: "j.pirklova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Tamara Jirků",
    role: "Učitel výtvarného oboru",
    email: "t.jirku@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },

  //ABSOLVENTI
  {
    name: "Tereza Hluchníková",
    role: "Učitel tanečního oboru",
    email: "t.hluchnikova@zushm.cz",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Kateřina Šťastná",
    role: "Absolvent",
    instrument: "klavír",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Jan Novák",
    role: "Absolvent",
    instrument: "housle",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Tereza Malá",
    role: "Absolvent",
    instrument: "flétna",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Petr Svoboda",
    role: "Absolvent",
    instrument: "kytara",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Lucie Dvořáková",
    role: "Absolvent",
    instrument: "violoncello",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Martin Král",
    role: "Absolvent",
    instrument: "klarinet",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Anna Veselá",
    role: "Absolvent",
    instrument: "saxofon",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Jakub Němec",
    role: "Absolvent",
    instrument: "trubka",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Barbora Horáková",
    role: "Absolvent",
    instrument: "bicí",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "David Černý",
    role: "Absolvent",
    instrument: "varhany",
    image: require("../data/img.teachers/default.jpg")
  },
  {
    name: "Eliška Marešová",
    role: "Absolvent",
    instrument: "zpěv",
    image: require("../data/img.teachers/default.jpg")
  }
  
];

export default teachers;
