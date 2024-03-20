type Category = {
  category_id: number;
  category_name: string;
};

type Species = {
  species_id: number;
  species_name: string;
  category: number;
  image: string;
};

export {Category, Species};
