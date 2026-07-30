export interface Project {
  id:          string;
  title:       string;
  location:    string;
  type:        string;
  area:        number;
  year:        number;
  materials:   string[];
  image:       string;
  imageAlt:    string;
  description: string;
  featured:    boolean;
}

export const projects: Project[] = [
  {
    id:          'casa-lo-curro',
    title:       'Casa Lo Curro',
    location:    'Lo Curro, Vitacura',
    type:        'Residencia Unifamiliar',
    area:        480,
    year:        2023,
    materials:   ['Hormigón visto', 'Madera de teca', 'Acero corten', 'Vidrio estructural'],
    image:       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    imageAlt:    'Casa moderna de hormigón visto en Lo Curro, Santiago',
    description: 'Residencia de hormigón visto integrada al cerro, con vistas panorámicas y jardín nativo. 480 m² de arquitectura contemporánea.',
    featured:    true,
  },
  {
    id:          'casa-la-dehesa',
    title:       'Casa La Dehesa',
    location:    'La Dehesa, Lo Barnechea',
    type:        'Residencia con Piscina',
    area:        620,
    year:        2023,
    materials:   ['Piedra laja', 'Madera de roble', 'Hormigón blanco', 'Cobre oxidado'],
    image:       'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
    imageAlt:    'Residencia de lujo con piscina en La Dehesa',
    description: 'Amplia residencia familiar con piscina perimetral, bodega de vinos subterránea y vistas a la cordillera.',
    featured:    true,
  },
  {
    id:          'retiro-pucon',
    title:       'Retiro Pucón',
    location:    'Pucón, La Araucanía',
    type:        'Casa de Campo',
    area:        320,
    year:        2022,
    materials:   ['Madera estructural laminada', 'Piedra volcánica', 'Zinc gris', 'Vidrio templado'],
    image:       'https://images.unsplash.com/photo-1605276373954-0240a5e0e3e4?w=1200&auto=format&fit=crop&q=80',
    imageAlt:    'Casa de campo moderna con vista al volcán Villarrica en Pucón',
    description: 'Retiro de montaña con vista directa al volcán Villarrica. Diseño bioclimático con materiales locales.',
    featured:    true,
  },
  {
    id:          'penthouse-vitacura',
    title:       'Penthouse Vitacura',
    location:    'Vitacura, Santiago',
    type:        'Remodelación & Penthouse',
    area:        290,
    year:        2022,
    materials:   ['Mármol carrara', 'Latón', 'Madera de nogal', 'Acero inox'],
    image:       'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
    imageAlt:    'Interior de penthouse de lujo en Vitacura',
    description: 'Remodelación integral de penthouse con materiales premium, terraza privada con jacuzzi y sala de entretenimiento.',
    featured:    false,
  },
  {
    id:          'casa-chicureo',
    title:       'Casa Chicureo',
    location:    'Chicureo, Colina',
    type:        'Hacienda Contemporánea',
    area:        780,
    year:        2021,
    materials:   ['Adobe reforzado', 'Tejas artesanales', 'Madera de lenga', 'Hierro forjado'],
    image:       'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    imageAlt:    'Hacienda contemporánea en Chicureo con piscina y jardines',
    description: 'Gran hacienda contemporánea en lote de 5.000 m². Caballerizas, capilla privada y campo de polo.',
    featured:    false,
  },
  {
    id:          'casa-las-condes',
    title:       'Casa Las Condes',
    location:    'Las Condes, Santiago',
    type:        'Residencia Urbana',
    area:        410,
    year:        2024,
    materials:   ['Hormigón pulido', 'Acero negro', 'Vidrio laminado', 'Mármol negro'],
    image:       'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80',
    imageAlt:    'Residencia urbana minimalista en Las Condes',
    description: 'Residencia urbana de líneas puras, doble altura en living, biblioteca de doble acceso y bodega temperada.',
    featured:    false,
  },
];

export const featuredProjects = projects.filter(p => p.featured);
