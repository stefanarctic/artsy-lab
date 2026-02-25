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
];

export const LESSONS_BY_ID = LESSONS_CATALOG.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {});

