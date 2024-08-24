import React, { useState } from 'react';
import { Helmet } from 'react-helmet';


const App = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [breed, setBreed] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState(null);
  const [kibbleGrams, setKibbleGrams] = useState([]);

const calculateCalories = (e) => {
  e.preventDefault();

  const weightInKg = parseFloat(weight);
  const RER = 70 * Math.pow(weightInKg, 0.75);

  let DER;
  switch (activityLevel) {
    case 'low':
      DER = RER * 1.6; // Neutered adult
      break;
    case 'medium':
      DER = RER * 2.0; // Active adult
      break;
    case 'high':
      DER = RER * 3.0; // Puppy or highly active dog
      break;
    default:
      DER = RER; // Default case
      break;
  }

  setCalories(DER.toFixed(2));

  // Example kibble conversion
  setKibbleGrams([
    { name: 'Kibble Brand A', grams: (DER / 350).toFixed(2), link: 'https://affiliate-link-to-brand-a.com' },
    { name: 'Kibble Brand B', grams: (DER / 400).toFixed(2), link: 'https://affiliate-link-to-brand-b.com' },
  ]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <Helmet>
        <title>Kibble Calculator - Calculate Your Dog's Calorie Needs</title>
        <meta name="description" content="Easily calculate your dog's daily calorie needs based on weight, age, breed, and activity level. Get kibble recommendations as well." />
        <meta name="keywords" content="dog calorie calculator, dog food calculator, dog nutrition, pet health" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Kibble Calculator",
              "description": "Easily calculate your dog's daily calorie needs based on weight, age, breed, and activity level. Get kibble recommendations as well.",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web",
              "url": "http://yourdomain.com/kibble-calculator"
            }
          `}
        </script>
      </Helmet>
      <h1 style={{ textAlign: 'center' }}>Kibble Calculator</h1>
      <form onSubmit={calculateCalories}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={{ marginLeft: '1rem', padding: '0.5rem', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              style={{ marginLeft: '1rem', padding: '0.5rem', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Breed:
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
              style={{ marginLeft: '1rem', padding: '0.5rem', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Activity Level:
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              required
              style={{ marginLeft: '1rem', padding: '0.5rem', width: '100%' }}
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <button type="submit" style={{ padding: '0.75rem', width: '100%', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Calculate</button>
      </form>

      {calories && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Results</h2>
          <p>Calories needed: {calories}</p>
          <p>Equivalent in Kibble:</p>
          <ul>
            {kibbleGrams.map((kibble, index) => (
              <li key={index}>
                <a href={kibble.link} target="_blank" rel="noopener noreferrer">
                  {kibble.name}: {kibble.grams}g
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;