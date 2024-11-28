import { useState } from "react";

const InitialItems = [
  {id:1, description:"Passport", quantity:2, packed:false},
  {id:2, description:"Socks", quantity:12, packed:false},
  {id:3, description:"Bags", quantity:16, packed:true},
];

export default function App()
{
  
  const [items, setItem] = useState(InitialItems);

  function handleItems(item)
  {
    setItem((items)=>[...items, item]);
  }
  
  function handleDeleteItem(id){
    // Filtra gli elementi mantenendo solo quelli il cui id non corrisponde a quello passato
    setItem(items=>items.filter(item=>item.id !== id))
  }

 return (
 <div className="app">
    <Logo />
    <Form onAddItems={handleItems} />
    <PackingList items={items} OnDeleteItem={handleDeleteItem} />
    <Stats />
  </div>
 );
}



function Logo()
{
  return (
    <h1> Far Away </h1>
    );
}

function Form({onAddItems})
{

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

function PackingList({items, OnDeleteItem}){
  return (
    <div className="list">
      <ul>
      {items.map((item) => (
        <Item item={item} OnDeleteItem={OnDeleteItem} key={item.id} />
      ))}
      </ul>
    </div>
  );
}

function Item({item, OnDeleteItem})
{
 return <li>
   <span style={item.packed ? {textDecoration:'line-through'} : {}}>
    {item.quantity} {item.description}
    </span>
    <button className="btn" onClick={()=>OnDeleteItem(item.id)}>&times;</button>
  </li>
}

function Stats()
{
  return (
    <footer> 
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
    );
}