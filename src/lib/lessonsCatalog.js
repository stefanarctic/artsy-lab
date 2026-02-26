import headShapeRef from "@/assets/reference-head-shape.png";
import eyesRef from "@/assets/reference-eyes.png";
import noseRef from "@/assets/reference-nose.png";
import mouthRef from "@/assets/reference-mouth.png";

export const LESSONS_CATALOG = [
  {
    id: "head-shape",
    title: "Forma capului și proporțiile",
    description:
      "Învață structura fundamentală și proporțiile capului uman pentru a crea baza oricărui portret reușit",
    difficulty: "Începător",
    duration: "15 min",
    objectives: [
      "Înțelegerea proporțiilor standard ale capului",
      "Construirea formei de bază a craniului",
      "Plasarea corectă a elementelor faciale",
      "Stabilirea liniilor directoare pentru simetrie",
    ],
    tips: [
      "Începe cu forme geometrice simple",
      "Folosește linii ușoare pentru schițare",
      "Verifică constant simetria",
      "Marchează clar liniile mediane",
    ],
    referenceImage: headShapeRef,
  },
  {
    id: "eyes",
    title: "Desenarea ochilor",
    description:
      "Stăpânește arta desenării ochilor realiști cu anatomie corectă și expresivitate naturală",
    difficulty: "Începător",
    duration: "20 min",
    objectives: [
      "Înțelegerea structurii anatomice a ochiului",
      "Desenarea corectă a pleoapelor și genelor",
      "Redarea expresivității prin detalii fine",
      "Crearea iluziei de profunzime și strălucire",
    ],
    tips: [
      "Observă forma alungită a ochiului",
      "Acordă atenție reflexiilor din iris",
      "Nu uita de umbrele sub pleoapa superioară",
      "Adaugă detalii gradual, de la general la specific",
    ],
    referenceImage: eyesRef,
  },
  {
    id: "nose",
    title: "Structura nasului",
    description:
      "Înțelege anatomia nasului și învață să-l desenezi corect din orice unghi pentru un portret convingător",
    difficulty: "Intermediar",
    duration: "18 min",
    objectives: [
      "Studierea structurii cartilaginoase a nasului",
      "Înțelegerea jocului de lumini și umbre",
      "Desenarea corectă a nărilor și punții nazale",
      "Redarea volumului prin tehnici de umbrire",
    ],
    tips: [
      "Începe cu forma de bază triunghiulară",
      "Observă cum lumina afectează formele",
      "Acordă atenție proporțiilor relative",
      "Folosește umbre subtile pentru volum",
    ],
    referenceImage: noseRef,
  },
  {
    id: "mouth",
    title: "Buzele și gura",
    description:
      "Învață să desenezi buze expresive și naturale, stăpânind anatomia și textura acestora",
    difficulty: "Intermediar",
    duration: "22 min",
    objectives: [
      "Înțelegerea anatomiei buzelor",
      "Desenarea corectă a arcului lui Cupidon",
      "Redarea texturii și volumului",
      "Crearea expresiilor faciale prin poziția buzelor",
    ],
    tips: [
      "Observă forma de M a buzei superioare",
      "Buza inferioară este de obicei mai plină",
      "Folosește umbre pentru a sugera volumul",
      "Adaugă mici detalii pentru textura naturală",
    ],
    referenceImage: mouthRef,
  },
  {
    id: "eyebrows",
    title: "Sprâncenele",
    description:
      "Învață forma și direcția firelor de păr pentru sprâncene naturale și expresive",
    difficulty: "Începător",
    duration: "12 min",
    objectives: [
      "Poziționarea corectă a sprâncenelor față de ochi",
      "Direcția firelor și arcul natural",
      "Grosime și densitate variabilă",
      "Simetria și expresivitatea",
    ],
    tips: [
      "Sprâncenele încep deasupra canalului lacrimal",
      "Firele nu sunt paralele – urmează curba",
      "Evită linii prea ascuțite",
      "Umbrire ușoară sub sprâncene pentru profunzime",
    ],
    referenceImage: eyesRef,
  },
  {
    id: "ears",
    title: "Urechile",
    description:
      "Înțelege anatomia urechii și desenează-o corect din profil și semi-profil",
    difficulty: "Începător",
    duration: "16 min",
    objectives: [
      "Forma generală și proporțiile urechii",
      "Helix, antihelix și lobul",
      "Plasarea urechii față de cap",
      "Umbrire pentru volum",
    ],
    tips: [
      "Urechea se aliniază aproximativ cu sprâncena și baza nasului",
      "Lobul nu e un cerc – are formă distinctă",
      "Detaliile din interior nu trebuie exagerate",
      "Compară mereu cu cealaltă ureche pentru simetrie",
    ],
    referenceImage: headShapeRef,
  },
  {
    id: "hair-line",
    title: "Părul și linia capului",
    description:
      "Desenează linia de creștere a părului și textura pentru un cap realist",
    difficulty: "Începător",
    duration: "18 min",
    objectives: [
      "Linia capului și forma craniului",
      "Direcția și grupurile de fire",
      "Volume și umbră la păr",
      "Integrarea părului cu fața",
    ],
    tips: [
      "Nu desena fire individuale – gândește în mase",
      "Linia capului urmează craniul, nu e plată",
      "Folosește umbre pentru volum",
      "Părul reflectă lumina diferit în funcție de textură",
    ],
    referenceImage: headShapeRef,
  },
  {
    id: "full-face",
    title: "Proporții față completă",
    description:
      "Combină toate elementele într-o față proporționată văzută din față",
    difficulty: "Intermediar",
    duration: "25 min",
    objectives: [
      "Raportarea ochi, nas, gură, urechi în același desen",
      "Axe și simetrie",
      "Proporții clasice (ochi la jumătate, nas la treime etc.)",
      "Unificarea luminii și umbrei",
    ],
    tips: [
      "Începe cu ovalul și liniile de ghid",
      "Verifică distanța dintre ochi (un ochi între ei)",
      "Baza nasului la mijlocul vertical",
      "Buza inferioară aproximativ la jumătatea distanței nas–bărbie",
    ],
    referenceImage: headShapeRef,
  },
  {
    id: "shadow-light",
    title: "Umbră și lumină pe față",
    description:
      "Aplică valorile de lumină și umbră pentru a da volum și expresie feței",
    difficulty: "Intermediar",
    duration: "22 min",
    objectives: [
      "Identificarea sursei de lumină",
      "Zone de lumină, umbră și semi-umbră",
      "Contur și umbră de proiecție",
      "Transiții line între valori",
    ],
    tips: [
      "Decide din start unde e lumina",
      "Umbra proprie urmează anatomia",
      "Umbra aruncată e mai dură la margini",
      "Evită contururi prea dure – folosește gradienți",
    ],
    referenceImage: headShapeRef,
  },
  {
    id: "facial-expressions",
    title: "Expresii faciale",
    description:
      "Redă bucuria, tristețea, mânia și surpriza prin trăsături și umbră",
    difficulty: "Intermediar",
    duration: "20 min",
    objectives: [
      "Cum se schimbă ochii, sprâncenele și gura la fiecare expresie",
      "Tensiunea și relaxarea mușchilor",
      "Riduri și linii expresive",
      "Coerența între toate elementele feței",
    ],
    tips: [
      "Sprâncenele și gura conduc expresia",
      "Ochii se strâng sau se deschid în funcție de emoție",
      "Nu exagera – expresiile subtile sunt credibile",
      "Studiază fotografii și oglinda",
    ],
    referenceImage: eyesRef,
  },
  {
    id: "portrait-three-quarter",
    title: "Portret în trei sferturi",
    description:
      "Desenează fața din unghiul clasic de trei sferturi, cu volum și perspectivă",
    difficulty: "Avansat",
    duration: "28 min",
    objectives: [
      "Perspectivă și foreshortening la față",
      "Diferența de mărime între partea apropiată și cea îndepărtată",
      "Linia maxilarului și a tâmplei",
      "Un ochi și o ureche parțial ascunse",
    ],
    tips: [
      "Partea îndepărtată e ușor mai mică și mai îngustă",
      "Linia centrală a feței e curbă în trei sferturi",
      "Urechea din spate e mai sus și parțial vizibilă",
      "Verifică aliniamentele cu linii auxiliare",
    ],
    referenceImage: headShapeRef,
  },
];

export const LESSONS_BY_ID = LESSONS_CATALOG.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {});

