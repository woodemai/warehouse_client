import axios from "axios";
import { useEffect, useState } from "react";
import MainTabs from './components/item/MainTabs';

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/categories")
      .then((res) => setCategories(res.data));
    axios.get("http://localhost:8080/item").then(res => {
      const items = res.data;
      setItems(items);
    })
  }, []);
  return <MainTabs items={items} categories={categories} />
}

export default App;
