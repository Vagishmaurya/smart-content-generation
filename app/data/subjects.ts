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
        id: 'a-letter-to-god',
        name: 'A Letter to God',
        path: 'content/English/A_letter_to_god',
        files: ['index.html']
      },
      {
        id: 'nelson-mandela',
        name: 'Nelson Mandela',
        path: 'content/English/Nelson_Mandela',
        files: ['index.html']
      },
      {
        id: 'flying-stories',
        name: 'Flying Stories',
        path: 'content/English/Flying Stories',
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
      }
    ]
  }
];
