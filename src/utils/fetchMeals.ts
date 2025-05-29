import { Meal } from '@/types/Meal'; 

export const fetchDesserts = async (): Promise<Meal[]> => {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.meals; 
  } catch (error) {
    console.error('Failed to fetch desserts:', error);
    return [];
  }
};
