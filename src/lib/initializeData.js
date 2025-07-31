import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export const initializeLessons = async () => {
  const lessons = [
    {
      id: "head-shape",
      title: "Forma capului și proporțiile",
      description: "Învață structura fundamentală și proporțiile capului uman",
      difficulty: "beginner",
      category: "portrait",
      order: 1,
      objectives: [
        "Înțelege proporțiile de bază ale capului",
        "Desenează forma ovală a capului",
        "Marchează liniile directoare pentru trăsăturile faciale",
        "Exersează construcția capului"
      ],
      tips: [
        "Începe cu o formă ovală ușoară",
        "Capul este aproximativ 7-8 lungimi ale capului înălțime",
        "Ochii sunt poziționați la jumătatea capului",
        "Folosește linii ușoare pentru ghidurile inițiale"
      ],
      isPublic: true
    },
    {
      id: "eyes",
      title: "Desenarea ochilor",
      description: "Stăpânește arta desenării ochilor realiști cu anatomie corectă",
      difficulty: "beginner",
      category: "portrait",
      order: 2,
      objectives: [
        "Understand eye anatomy structure",
        "Draw the eye socket and eyelids",
        "Add the iris, pupil, and highlights",
        "Practice different eye expressions"
      ],
      tips: [
        "Eyes are almond-shaped, not perfect ovals",
        "Leave white space for natural highlights",
        "The upper eyelid creates more shadow",
        "Practice both eyes to maintain symmetry"
      ],
      isPublic: true
    },
    {
      id: "nose",
      title: "Structura nasului",
      description: "Înțelege anatomia nasului și învață să-l desenezi din diferite unghiuri",
      difficulty: "intermediate",
      category: "portrait",
      order: 3,
      objectives: [
        "Learn nose basic structure",
        "Draw the nose bridge and nostrils",
        "Understand light and shadow on the nose",
        "Practice different nose types"
      ],
      tips: [
        "The nose is like a triangular prism",
        "Focus on the shadow shapes",
        "Nostrils are not perfect circles",
        "The nose tip catches the most light"
      ],
      isPublic: true
    },
    {
      id: "mouth",
      title: "Buzele și gura",
      description: "Învață să desenezi buzele și expresiile gurii cu încredere",
      difficulty: "intermediate",
      category: "portrait",
      order: 4,
      objectives: [
        "Understand lip anatomy and structure",
        "Draw the mouth line and lip shapes",
        "Add dimension with light and shadow",
        "Practice different expressions"
      ],
      tips: [
        "The upper lip is typically darker",
        "The mouth line isn't a straight line",
        "Lower lip catches more light",
        "Practice subtle expressions first"
      ],
      isPublic: true
    }
  ];

  try {
    for (const lesson of lessons) {
      await setDoc(doc(db, 'lessons', lesson.id), {
        ...lesson,
        createdAt: new Date()
      });
    }
    console.log('Lessons initialized successfully');
  } catch (error) {
    console.error('Error initializing lessons:', error);
  }
};