// Modify the datastructure to match the website

// Disclaimers
// DO NOT USE ARRAYS, IF YOU NEED TO, MAKE THE ELEMENTS OBJECTS WITH 1 ATTRBUTES {"paragraph": "insert_text"}[] 
// THIS DOES NOT AFFECT NAVBAR/FOOTER ITEMS
// DOES NOT MOBILE DESIGN ADAPT

// Other helpful things
// src, imageSrc will prompt image uploading
// Links are manually made in the pages (set <Link href ={item.link}>content</Link>)
// It may not render for you when u check it out on the main; thats cuz theres caches. Just trust it works C:
// Updated DataStructure Interface
export interface DataStructure {
  global: {
    theTeam: {
      name: string;
      position: string;
      introduction: string;
      imageSrc: string;
    }[];
    join: {
      heading: string;
      description: string;
      buttonText: string;
      joinLink: string;
    };
    opportunities: {
      featured: {
        imageSrc: string;
        title: string;
        description: string;
      }[];
      other: {
        imageSrc: string;
        title: string;
        description: string;
      }[];
    };
  };
  landing: {
    hero: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
    testimonials: {
      id: number;
      quote: string;
      author: string;
    }[];
  };
  about: {
    heading: string;
    mission: {
      heading: string;
      description: string;
      imageSrc: string;
      altText: string;
    };
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
    history: {
      heading: string;
      description: string;
    };
    join: {
      heading: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  classes: {
    categories: {
      paragraph: string;      
    }[];
    classes: {
      id: number;
      title: string;
      description: string;
      date: string;
      slidesUrl: string;
      videoUrl: string;
      category: string;
    }[];
  };
  opportunities: string;
};