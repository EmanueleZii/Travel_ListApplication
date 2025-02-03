import { useState }  from "react";
import Logo from "./components/logo";
import Form from "./components/form";
import PackingList from "./components/PackingList";
import Stats from "./components/stats";


const InitialItems = [
  {id:1, description:"Passport", quantity:2, packed:false},
  {id:2, description:"Socks", quantity:12, packed:false},
  {id:3, description:"Bags", quantity:16, packed:true},
];

export default function App() {
  
  const [items, setItem] = useState(InitialItems);
  const numItems = items.length;

  function handleItems(item) {
    setItem((items)=>[...items, item]);
  }
  
  function handleDeleteItem(id) {
    // Filtra gli elementi mantenendo solo quelli il cui id non corrisponde a quello passato
    setItem(items=>items.filter(item=>item.id !== id))
  }

  function handleToggleItem(id) {
    setItem(items => items.map(item=> item.id === id ? 
      {...item, packed: !item.packed }: item))
  }

  function handleClearList() {
   const confirmed = window.confirm('Are you sure want ot delete all items');

   if (confirmed) setItem([]);
  }

 return (
 <div className="app">
    <Logo />
    <Form onAddItems={handleItems} />
    <PackingList items={items} OnDeleteItem={handleDeleteItem} OnToggleItem={handleToggleItem} onClearList={handleClearList}  />
    <Stats items={items} />
  </div>
 );
}

