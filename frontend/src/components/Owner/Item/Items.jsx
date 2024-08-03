import { useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard';
import { useEffect, useState } from 'react';

const Items = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const clgName = localStorage.getItem('clg');

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await fetch(`/api/v1/items?collegeCanteen=${clgName}`);
        const data = await response.json();
        // const items = data.items.filter((el) => el.collegeCanteen === clgName);
        const items = data.items;
        setItems(items);
      } catch (err) {
        window.alert(err);
      }
    }
    getAllItems();
  }, [clgName]);

  return (
    <div className="items">
      <div className="items__functions">
        <input
          className="items__search input u-margin-top u-margin-bottom"
          placeholder="search dishes"
          type="text"
        />
        <button
          onClick={() => {
            navigate('/additem?mode=add');
          }}
          className="button button--primary"
        >
          +add new item
        </button>
      </div>
      <div className="items__display">
        <h2 className="items__title">featured dishes</h2>
        {items.length === 0 ? (
          <p>You have no items</p>
        ) : (
          items.map((item) => (
            <ItemCard
              key={item._id}
              name={item.name}
              reviewcount={item.numOfReviews}
              description={item.description}
              price={item.price}
              id={item._id}
              image={item.image}
              rating={item.rating}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Items;
