import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import getLocation from '../hooks/user-location';

export default function Localities() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple 🍎', value: 'apple' },
    { label: 'Banana 🍌', value: 'banana' },
    { label: 'Orange 🍊', value: 'orange' },
    { label: 'dragonfruit', value: 'dragonfruit' },
  ]);

  useEffect(() => {
    getLocation().then((location) => {
      const area = location?.district || location?.city || location?.name;
      if (!area) return;
  
      setItems((current) => [{ label: area, value: area }, ...current]);
      setValue(area);
    });
  }, []);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Locating you..."
    />
  );
}
