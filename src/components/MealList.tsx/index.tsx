import React from 'react';
import { Meal } from '@/types/Meal';

interface MealListProps {
  meals: Meal[];
}

const MealList: React.FC<MealListProps> = ({ meals }) => {
  if (meals.length === 0) {
    return <p>No meals found.</p>;
  }

  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <div key={meal.idMeal} className="meal-card">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
          <h3>{meal.strMeal}</h3>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Area:</strong> {meal.strArea}</p>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch Recipe Video
          </a>
        </div>
      ))}
    </div>
  );
};

export default MealList;
