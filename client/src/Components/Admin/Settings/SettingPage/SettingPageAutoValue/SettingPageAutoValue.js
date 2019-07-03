import React, { useState } from 'react';


export default function SettingPageAutoValue({
  name,
  onChange,
  setValue,
  value,
}) {
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    onChange({ target: { name, value } });
  } 
  return <div></div>;
}
