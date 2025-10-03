export type Subject = {
  id: string;
  name: string;
  description: string;
  icon: string;
  chapters: Chapter[];
};

export type Chapter = {
  id: string;
  name: string;
  path: string;
  files: string[];
  youtube?: string;
  chapters?: Chapter[];  // For nested chapters
};

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Explore numbers, patterns, and the language of logic',
    icon: '🧮',
    chapters: [
      {
        id: 'trigonometry-functions',
        name: 'Trigonometry Functions',
        path: 'content/Mathematics',
        files: ['Trigonometry Functions.html']
      },
      {
        id: 'ellipse',
        name: 'Ellipse',
        path: 'content/Mathematics',
        files: ['Elipse.html']
      },
      {
        id: 'geometry',
        name: 'Geometry',
        path: 'content/Mathematics',
        files: ['Geometry.html']
      },
      {
        id: 'linear-equations',
        name: 'Linear Equations',
        path: 'content/Mathematics',
        files: ['Linear Equations.html']
      }
    ]
  },
  {
    id: 'socialscience',
    name: 'Social Science',
    description: 'Understand society, economics, politics, and human relationships',
    icon: '🌍',
    chapters: [
      {
        id: 'palampur-economics',
        name: 'Palampur Economics',
        path: 'content/Social Science/Palampur Economics',
        files: ['index.html']
      },
      {
        id: 'democracy',
        name: 'Democracy',
        path: 'content/Social Science/Democracy',
        files: ['index.html']
      },
      {
        id: 'constitutional-design',
        name: 'Constitutional Design',
        path: 'content/Social Science/Constitutional Design',
        files: ['index.html']
      },
      {
        id: 'mughal-empire',
        name: 'Mughal Empire',
        path: '',
        files: [],
        youtube: 'https://youtu.be/tYnkfIadmKI?si=puUtnWHJBQANRSl9'
      },
      {
        id: 'electoral-politics',
        name: 'Electoral Politics',
        path: 'content/Social Science/Electoral politics',
        files: ['index.html']
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Discover the composition, structure, and properties of matter',
    icon: '🧪',
    chapters: [
      {
        id: 'carbon-and-its-compound',
        name: 'Carbon and its Compound',
        path: 'content/Chemistry/Carbon and its Compound',
        files: [
          'Chemical_properties_of_carbon_compunds.html',
          'Covalent_bond_and_carbon.html',
          'Important_carbon_compund.html',
          'Versatile_nature_of_Carbon.html'
        ]
      },
      {
        id: 'structure-of-an-atom',
        name: 'Structure of an Atom',
        path: 'content/Chemistry/Structure of an atom',
        files: [
          'Atomic models.html',
          'Charged particles.html',
          'Isotopes and Isobars.html',
          'Electron distribution.html',
          'Valency.html',
          'Atomic number and mass.html'
        ]
      }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    description: 'Explore the science of life from cells to ecosystems',
    icon: '🧬',
    chapters: [
      {
        id: 'control-coordination',
        name: 'Control and Coordination',
        path: 'content/Biology/Control and Coordination',
        files: [
          'animal_hormones_exhibit.html',
          'control_coordination_exhibit.html',
          'human_brain_structure_exhibit.html',
          'muscle_tissue_exhibit.html',
          'nervous_tissue_protection_exhibit.html',
          'neuron_structure_function_exhibit.html',
          'plant_coordination_exhibit.html',
          'plant_hormones_exhibit.html',
          'reflex_actions_exhibit.html'
        ]
      },
      {
        id: 'fundamental-unit-of-life',
        name: 'Fundamental Unit of Life',
        path: 'content/Biology/Fundamental Unit of Life',
        files: [
          'cell_discovery.html',
          'cell_division.html',
          'cell_membrane.html',
          'cell_wall_plasmolysis.html',
          'energy_organelles.html',
          'nucleus_genetic.html',
          'organelle_systems_exhibit.html'
        ]
      },
      {
        id: 'hereditary',
        name: 'Hereditary',
        path: 'content/Biology/Hereditary',
        files: [
          'dihybrid_crosses_exhibit.html',
          'gamete_formation_exhibit.html',
          'inherited_traits_exhibit.html',
          'mendel_monohybrid_exhibit.html',
          'molecular_basis_exhibit.html',
          'sex_determination_exhibit (2).html',
          'variation_heredity_exhibit.html'
        ]
      },
      {
        id: 'improvement-in-food-resources',
        name: 'Improvement in Food Resources',
        path: 'content/Biology/Improvement in food resources',
        files: [
          'animal_husbandry_exhibit.html',
          'crop_breeding_exhibit.html',
          'fisheries_beekeeping_exhibit.html',
          'food_security_exhibit.html',
          'irrigation_protection_exhibit.html',
          'nutrient_soil_exhibit.html'
        ]
      },
      {
        id: 'life-processes',
        name: 'Life Processes',
        path: 'content/Biology/Life Processes',
        files: [
          'blood_vessels_exhibit.html',
          'cellular_respiration_exhibit (1).html',
          'circulatory_system_exhibit (1).html',
          'excretion_regulation_exhibit.html',
          'excretory_system_exhibit.html',
          'gas_transport_exhibit.html',
          'heterotrophic_nutrition_exhibit.html',
          'human_digestion_process_exhibit.html',
          'human_digestive_system_exhibit.html',
          'human_respiratory_system_exhibit.html',
          'life_processes_exhibit.html',
          'photosynthesis_exhibit.html',
          'photosynthesis_experiments_exhibit.html',
          'plant_transport_exhibit.html',
          'respiratory_pathways_exhibit.html',
          'transpiration_translocation_exhibit.html'
        ]
      },
      {
        id: 'our-environment',
        name: 'Our Environment',
        path: 'content/Biology/Our Environment',
        files: [
          'ecosystem_exhibit.html',
          'environmental_impact_exhibit.html',
          'food_chains_exhibit.html',
          'waste_management_exhibit.html'
        ]
      },
      {
        id: 'reproduction',
        name: 'Reproduction',
        path: 'content/Biology/Reproduction',
        files: [
          'asexual-fission-exhibit.html',
          'budding-vegetative-exhibit.html',
          'female_reproductive_system_exhibit.html',
          'fertilization_pregnancy_birth_exhibit.html',
          'flowering_plant_reproduction_exhibit.html',
          'fragmentation-regeneration-exhibit.html',
          'male_reproductive_system_exhibit.html',
          'reproduction-dna-exhibit.html',
          'reproductive_health_contraception_exhibit.html',
          'sexual_reproduction_exhibit.html',
          'spore-formation-exhibit.html'
        ]
      },
      {
        id: 'tissues',
        name: 'Tissues',
        path: 'content/Biology/Tissues',
        files: [
          'complex_tissues_protection.html',
          'epithelial_connective_tissues.html',
          'muscular_tissues_interactive.html',
          'nervous_tissue_interactive.html',
          'plant_tissues_exhibit.html',
          'simple_permanent_tissues.html'
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    description: 'Discover literature, language, and communication',
    icon: '📚',
    chapters: [
      {
        id: 'english-beehive-book',
        name: '📘 Beehive',
        path: '',
        files: []
      },
      {
        id: 'english-word-expression-1-book',
        name: '📕 Word Expression 1',
        path: '',
        files: []
      },
      {
        id: 'english-word-expression-book',
        name: '📗 Word Expression 2',
        path: '',
        files: []
      },
      {
        id: 'english-first-flight-book',
        name: '✈️ First Flight',
        path: '',
        files: []
      }
    ]
  },
  {
    id: 'english-word-expression-1',
    name: 'English: Word Expression 1',
    description: 'Supplementary English Reader 1',
    icon: '📕',
    chapters: [
      {
        id: 'word-exp1-the-fun-they-had',
        name: 'Ch 1: The Fun They Had',
        path: 'content/English/Word Expression 1/1_the_fun_they_had/future-cars-lesson',
        files: ['index.html']
      },
      {
        id: 'word-exp1-the-sound-of-music',
        name: 'Ch 2: The Sound of Music',
        path: 'content/English/Word Expression 1/2_The_sound_of_music/music-lesson',
        files: ['index.html']
      },
      {
        id: 'word-exp1-the-little-girl',
        name: 'Ch 3: The Little Girl',
        path: 'content/English/Word Expression 1/3_The_little_girl/little-girl-lesson',
        files: ['index.html']
      },
      {
        id: 'word-exp1-beautiful-mind',
        name: 'Ch 4: A Truly Beautiful Mind',
        path: 'content/English/Word Expression 1/4_A_truly_beautiful_mind/unit4-lesson',
        files: ['index.html']
      },
      {
        id: 'word-exp1-snake-mirror',
        name: 'Ch 5: The Snake and the Mirror',
        path: 'content/English/Word Expression 1/5_The_snake_and_the_mirror/snake-chapter',
        files: ['index.html']
      },
      {
        id: 'word-exp1-my-childhood',
        name: 'Ch 6: My Childhood',
        path: 'content/English/Word Expression 1/6_My_childhood/unit-6-lesson',
        files: ['index.html']
      },
      {
        id: 'word-exp1-reach-for-the-top',
        name: 'Ch 7: Reach for the Top',
        path: 'content/English/Word Expression 1/7_Reach_for_the_Top/unit7-lesson',
        files: ['index.html']
      },
      {
        id: 'word-exp1-kathmandu',
        name: 'Ch 8: Kathmandu',
        path: 'content/English/Word Expression 1/8_kathmandu/kathmandu-lesson',
        files: ['index.html']
      }
    ]
  },
  {
    id: 'english-book-beehive',
    name: 'English: Beehive',
    description: 'NCERT Class 9 English Beehive Textbook',
    icon: '📘',
    chapters: [
      {
        id: 'beehive-the-fun-they-had',
        name: 'Ch 1: The Fun They Had',
        path: 'content/English/BEEHIVE/1_the-fun-they-had-lesson/the-fun-they-had-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-the-sound-of-music',
        name: 'Ch 2: The Sound of Music',
        path: 'content/English/BEEHIVE/2_The-sound-of-music-lesson/the-sound-of-music-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-the-little-girl',
        name: 'Ch 3: The Little Girl',
        path: 'content/English/BEEHIVE/3_the-little-girl-lesson/the-little-girl-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-a-truly-beautiful-mind',
        name: 'Ch 4: A Truly Beautiful Mind',
        path: 'content/English/BEEHIVE/4_A-truly-beautiful-mind-lesson/a-truly-beautiful-mind-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-the-snake-and-the-mirror',
        name: 'Ch 5: The Snake and the Mirror',
        path: 'content/English/BEEHIVE/5_the-snake-and-the-mirror-lesson/the-snake-and-the-mirror-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-my-childhood',
        name: 'Ch 6: My Childhood',
        path: 'content/English/BEEHIVE/6_My-childhood-lesson/my-childhood-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-reach-for-the-top',
        name: 'Ch 7: Reach for the Top',
        path: 'content/English/BEEHIVE/7_reach-for-the-top-lesson/reach-for-the-top-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-kathmandu',
        name: 'Ch 8: Kathmandu',
        path: 'content/English/BEEHIVE/8_kathmandu-lesson/kathmandu-lesson',
        files: ['index.html']
      },
      {
        id: 'beehive-if-i-were-you',
        name: 'Ch 9: If I Were You',
        path: 'content/English/BEEHIVE/9_if-i-were-you-lesson/if-i-were-you-lesson',
        files: ['index.html']
      }
    ]
  },
  {
    id: 'english-first-flight',
    name: 'English: First Flight',
    description: 'NCERT Class 10 English First Flight Textbook',
    icon: '✈️',
    chapters: [
      {
        id: 'first-flight-nelson-mandela',
        name: 'Ch 2: Nelson Mandela',
        path: 'content/English/The First Flight/2_nelson-mandela-long-walk-to-freedom/nelson-mandela-long-walk-to-freedom',
        files: ['index.html']
      },
      {
        id: 'first-flight-two-stories-about-flying',
        name: 'Ch 3: Two Stories About Flying',
        path: 'content/English/The First Flight/3_Ttwo-stories-about-flying/two-stories-about-flying',
        files: ['index.html']
      },
      {
        id: 'first-flight-madam-rides-the-bus',
        name: 'Ch 7: Madam Rides the Bus',
        path: 'content/English/The First Flight/7_madam-rides-the-bus-lesson/madam-rides-the-bus-lesson',
        files: ['index.html']
      },
      {
        id: 'first-flight-the-sermon',
        name: 'Ch 8: The Sermon at Benares',
        path: 'content/English/The First Flight/8_sermon-at-benares-lesson/sermon-at-benares-lesson',
        files: ['index.html']
      },
      {
        id: 'first-flight-the-proposal',
        name: 'Ch 9: The Proposal',
        path: 'content/English/The First Flight/9_the-proposal-lesson/the-proposal-lesson',
        files: ['index.html']
      }
    ]
  },
  {
    id: 'english-word-expression',
    name: 'English: Word Expression 2',
    description: 'Supplementary English Reader',
    icon: '📕',
    chapters: [
      {
        id: 'a-letter-to-god',
        name: 'Ch 1: A Letter to God',
        path: 'content/English/Word Expression 2/A_letter_to_god',
        files: ['index.html']
      },
      {
        id: 'nelson-mandela',
        name: 'Ch 2: Nelson Mandela',
        path: 'content/English/Word Expression 2/Nelson_Mandela',
        files: ['index.html']
      },
      {
        id: 'anne-frank',
        name: 'Ch 3: Anne Frank',
        path: 'content/English/Word Expression 2/anne-frank-lesson/anne-frank-lesson',
        files: ['index.html']
      },
      {
        id: 'flying-stories',
        name: 'Ch 4: Flying Stories',
        path: 'content/English/Word Expression 2/Flying Stories',
        files: ['index.html']
      },
      {
        id: 'glimpses-of-india',
        name: 'Ch 5: Glimpses of India',
        path: 'content/English/Word Expression 2/glimpses-of-india/glimpses-of-india',
        files: ['index.html']
      },
      {
        id: 'mijbil-the-otter',
        name: 'Ch 6: Mijbil the Otter',
        path: 'content/English/Word Expression 2/mijbil-the-otter/mijbil-the-otter',
        files: ['index.html']
      },
      {
        id: 'sermon-at-benaras',
        name: 'Ch 7: Sermon at Benares',
        path: 'content/English/Word Expression 2/sermon-at-benaras-lesson/sermon-at-benaras-lesson',
        files: ['index.html']
      },
      {
        id: 'madam-rides-the-bus',
        name: 'Ch 8: Madam Rides the Bus',
        path: 'content/English/Word Expression 2/madam-rides-the-bus-lesson/madam-rides-the-bus-lesson',
        files: ['index.html']
      },
      {
        id: 'the-proposal',
        name: 'Ch 9: The Proposal',
        path: 'content/English/Word Expression 2/chapter-9-the-proposal/chapter-9-the-proposal',
        files: ['index.html']
      }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Explore the fundamental laws that govern the universe',
    icon: '⚛️',
    chapters: [
      {
        id: 'motion',
        name: 'Motion',
        path: 'content/Physics/Motion',
        files: [
          '7.1_motion.html',
          '7.2_measuring-the-rate-of-motion.html',
          '7.3_Rate-of-Change-of-Velocity.html',
          '7.4_Graphical-representation-of-motion.html',
          '7.5_equations-of-motion.html',
          'uniform-circular-motion-interactive(need-changes).html'
        ]
      },
      {
        id: 'force-and-laws-of-motion',
        name: 'Force and Laws of Motion',
        path: 'content/Physics/Force and laws of motion',
        files: [
          '8.1_balanced_and_unbalanced_forces.html',
          '8.2_First_law_of_motion.html',
          '8.3_inertia_and_mass.html',
          '8.4_second_law_of_motion.html',
          '8.4.1_derivation_2nd_law_of_motion.html',
          '8.5_third_law_of_motion.html'
        ]
      },
      {
        id: 'gravitation',
        name: 'Gravitation',
        path: 'content/Physics/Gravitation',
        files: [
          '9.1_Gravitation.html',
          '9.2_freefall.html',
          '9.3_Mass_9.4_Weight.html',
          '9.5_Thrust_and_Pressure.html',
          '9.6_Archimedes_Principle.html'
        ]
      },
      {
        id: 'work-and-energy',
        name: 'Work and Energy',
        path: 'content/Physics/Work and Energy',
        files: [
          '10.1_work.html',
          '10.2_energy.html',
          '10.3_Rate_of_Doing_Work.html'
        ]
      },
      {
        id: 'sound',
        name: 'Sound',
        path: 'content/Physics/Sound/Sound - Physics',
        files: [
          '11.1_Production_of_Sound.html',
          '11.2_PROPOGATION_OF_SOUND.html',
          '11.3_Reflection_of_SOUND.html',
          '11.4_Range_of_Hearing.html',
          '11.5_Applications_of_UltraSound.html'
        ]
      },
      {
        id: 'electricity',
        name: 'Electricity',
        path: 'content/Physics/Electricity',
        files: [
          'Electric Current & Potential Difference.html',
          'Circuit Diagram & Ohm\'s Law.html',
          'Resistance & Resistor Combinations.html',
          'Heating Effect & Electric Power.html',
        ]
      },
      {
        id: 'human-eye-and-colourful-world',
        name: 'Human Eye and Colourful World',
        path: 'content/Physics/Human Eye and colourful world',
        files: [
          'The Human Eye.html',
          'DEFECTS OF VISION AND THEIR CORRECTION.html',
          'REFRACTION OF LIGHT THROUGH A PRISM.html',
          'DISPERSION OF WHITE LIGHT BY A GLASS PRISM ASS PRISMASS PRISM.html',
          'Atmospheric refraction.html',
          'Scattering Light.html'
        ]
      },
      {
        id: 'light-refraction',
        name: 'Light Refraction',
        path: 'content/Physics/Light Refraction',
        files: [
          'Reflection of light.html',
          'Spherical mirrors.html',
          'Refraction glass slab.html',
          'Refraction.html'
        ]
      },
      {
        id: 'magnetic-effect-of-electric-current',
        name: 'Magnetic Effect of Electric Current',
        path: 'content/Physics/Magnetic Effect of Electric Current',
        files: [
          'Magnetic Effect.html',
          'MAGNETIC FIELD DUE TO A CURRENT-CARRYING ARRYING CONDUCTOR.html',
          'FORCE ON A CURRENT-CARRYING CONDUCTOR IN A MAGNETIC FIELD.html',
          'Domestic Circuit.html'
        ]
      }
    ]
  }
];
