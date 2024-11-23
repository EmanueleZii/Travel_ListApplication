const InitialItems = [
  {id:1, description:"Passport", quantity:2, packed:false},
  {id:2, description:"Socks", quantity:12, packed:false},
];

export default function App(){
 return (
 <div className="app">
    <Logo />
    <Form />
    <PackingList />
    <Stats />
  </div>
 );
}

function Logo(){
  return (
    <h1> Far Away </h1>
    );
}

function Form(){
  return (
   <form className="add-form">
    <h3> What do you need for your trip?</h3>
    <select>
    {Array.from({length: 20}, )}
    </select>
    <input type="text" placeholder="item..." />
    <button className="btn">Add</button>
   </form>
    );
}

function PackingList(){
  return (
    <div className="list">
      <ul>
      {InitialItems.map((item) => (
        <Item item={item} />
      ))}
      </ul>
    </div>
  );
}

function Item({item})
{
 return <li>
   <span style={item.packed ? {textDecoration:'line-through'} : {}}>
    {item.quantity} {item.description}
    </span>
    <button className="btn">&times;</button>
  </li>
}

function Stats(){
  return (
    <footer> 
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
    );
}