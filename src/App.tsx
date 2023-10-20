import axios from "axios";
import { useEffect, useState } from "react";
import MainTabs from './components/MainTabs';

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/categories").then((res) => setCategories(res.data));
    axios.get("http://localhost:8080/item").then(res => setItems(res.data));
    axios.get("http://localhost:8080/suppliers").then(res => setSuppliers(res.data));
  }, []);
  return <MainTabs items={items} categories={categories} suppliers={suppliers}/>
}

export default App;
