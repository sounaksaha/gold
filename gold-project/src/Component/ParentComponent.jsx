import React, { useState } from 'react';
import Header from './Header';
import AddForm from './AddRate';

export default function ParentComponent() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <AddForm darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
