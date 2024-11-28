import { useState } from "react";

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

function Logo() {
  return (
    <h1> Far Away </h1>
    );
}

function Form({onAddItems}) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem ={description, quantity, packed: false, id: Date.now()};
    onAddItems(newItem);
  }

  return (
   <form className="add-form" onSubmit={handleSubmit}>
    <h3> What do you need for your trip?</h3>
    <select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
     {Array.from({length: 20},
      (_,i)=> i + 1 )
      .map( num => 
      <option value={num} key={num} > {num} </option>
      )}
    </select>
    <input type="text" placeholder="item..." value={description} onChange={(e)=>setDescription(e.target.value)} />
    <button className="btn">Add</button>
   </form>
    );
}

function PackingList({items, OnDeleteItem, OnToggleItem, onClearList}) {
  
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === 'description') sortedItems = 
  items.slice()
  .sort((a,b) => a.description.localeCompare(b.description));

  if (sortBy ==="packed") sortedItems = items.slice()
    .sort((a,b)=> Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
      {sortedItems.map((item) => (
        <Item item={item} OnDeleteItem={OnDeleteItem} OnToggleItem={OnToggleItem} key={item.id} />
      ))}
      </ul>
      
      <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
        <option value='input'>Sort by input order</option>
        <option value='description'>Sort by description</option>
        <option value='packed'> Sort by packed status</option>
        </select>
        <button className="btn" onClick={onClearList}>Clear list</button>
      </div>

    </div>
  );
}

function Item({item, OnDeleteItem, OnToggleItem}) {
 return (
 <li>
    <input type="checkbox" value={item.packed} onChange={()=>OnToggleItem(item.id)} />
    <span style={item.packed ? {textDecoration:'line-through'} : {}}>
    {item.quantity} {item.description}
    </span>
    <button className="btn" onClick={()=>OnDeleteItem(item.id)}>&times;</button>
  </li>
 );
}

function Stats({items}) {
  if (!items.length) 
    return (
    <p className="footer">
      <em>Start to adding some items to your packing list please</em>
    </p>
  );

  const numItems = items.length;
  const numPacked = items.filter(item=>item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100);

  return (
    <footer> 
      <em>{percentage ===100 ? 
      'You got everything, Ready to go!!'
      :
      `You have {numItems} items on your list, 
      and you already packed {numPacked} ({percentage}%)`}
      </em>
    </footer>
    );
}