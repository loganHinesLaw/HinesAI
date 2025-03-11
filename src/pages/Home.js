import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Home = () => {
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);

  const handleSearch = async () => {
    let { data, error } = await supabase
      .from('doctors')
      .select('*')
      .ilike('specialty', `%${specialty}%`);
    
    if (!error) setDoctors(data);
  };

  return (
    <div>
      <h2>Find a Doctor</h2>
      <input type="text" placeholder="Specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {doctors.map(doc => (
          <li key={doc.id}>{doc.name} - {doc.specialty}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;