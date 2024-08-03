import { useEffect, useState } from 'react';
import leftArrow from '../../../assets/SVG/left-arrow.svg';
import useInput from '../../../hooks/useInput/use-input';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddItem = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isAdd = searchParams.get('mode') === 'add';
  const itemId = searchParams.get('item-id');

  const ownerId = localStorage.getItem('id');
  const [item, setItem] = useState(null);
  ///////////////////////////////////////////////////////////////////////////////////////

  const {
    value: enteredName,
    hasError: nameHasError,
    isValueValid: isNameValid,
    blurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
  } = useInput((name) => name.trim() !== '');

  const {
    value: enteredPrice,
    hasError: priceHasError,
    isValueValid: isPriceValid,
    blurHandler: priceBlurHandler,
    valueChangeHandler: priceChangeHandler,
  } = useInput(
    (price) => price.trim() !== '' && price.match(/^[0-9]+$/) != null
  );

  const {
    value: enteredDesc,
    hasError: descHasError,
    isValueValid: isDescValid,
    blurHandler: descBlurHandler,
    valueChangeHandler: descChangeHandler,
  } = useInput((desc) => desc.trim() !== '');

  const { value: enteredCategory, valueChangeHandler: categoryChangeHandler } =
    useInput((category) => category.trim() !== '');

  const { value: enteredType, valueChangeHandler: typeChangeHandler } =
    useInput((type) => type.trim() !== '');

  const {
    value: enteredImage,
    valueChangeHandler: imageChangeHandler,
    blurHandler: imageBlurHandler,
  } = useInput((image) => image.trim() !== '');

  ///////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function getItem(id) {
      try {
        const response = await fetch(`/api/v1/item/${id}`);
        if (!response) {
          const data = await response.json();
          throw new Error('error getting item: ' + data.message);
        }
        const data = await response.json();
        setItem(data && data.item);
      } catch (err) {
        window.alert(err);
      }
    }
    !isAdd && getItem(itemId);
  }, [isAdd, itemId]);
  //////////////////////////////////////////////////////////////////////////////////////

  const addItem = async (newItem) => {
    try {
      const response = await fetch('/api/v1/item/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`error adding new item: ${data.message}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      window.alert(err.message);
      return null;
    }
  };

  const updateItem = async (newItem, itemId) => {
    try {
      const response = await fetch(`/api/v1/item/${itemId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('error updating!');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      window.alert(err.message);
      return null;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isNameValid && !isPriceValid && !isDescValid && isAdd) {
      window.alert('enter valid values');
      return;
    }

    const newItem = {
      name: enteredName || (item && item.name),
      description: enteredDesc || (item && item.description),
      price: +enteredPrice || (item && Number(item.price)),
      category: enteredCategory || (item && item.category),
      type: enteredType || (item && item.type),
      availability: true,
      image: enteredImage || item && item.image.replace(/\s/g,'') || `https://source.unsplash.com/1600x900/?${enteredName.replace(/\s/g, '')}`, 
    };

    const response = isAdd
      ? await addItem(newItem)
      : await updateItem(newItem, itemId);

    if (response) {
      isAdd
        ? window.alert('item added successfully')
        : window.alert('item updated successfully');
      navigate('/oitems');
    }
  };

  async function deleteHandler(itemId) {
    try {
      const response = await fetch(`/api/v1/item/${itemId}`, {
        method: 'delete',
      });
      if (!response.ok) {
        throw new Error('Error deleting item');
      }
      window.alert('item deleted');
      navigate('/oitems');
    } catch (err) {
      window.alert(err);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="add-item">
      <div className="add-item__title" onClick={() => navigate('/oitems')}>
        <div>
          <img src={leftArrow} alt="<" />
        </div>
        <h2 className="heading-secondary u-margin-left">
          {isAdd ? 'add new item' : 'edit item'}
        </h2>
      </div>
      {ownerId ? (
        <form className="add-item__form" onSubmit={onSubmitHandler}>
          <div className="add-item__form-group add-item__form-group--1">
            <label
              className="add-item__label heading-secondary u-margin-bottom"
              htmlFor="name"
            >
              Item name
            </label>
            <input
              className={nameHasError ? 'input--error' : 'input'}
              type="text"
              placeholder="enter item name"
              id="name"
              onBlur={nameBlurHandler}
              onChange={nameChangeHandler}
              defaultValue={item && item.name}
            />
          </div>

          <div className="add-item__form-group add-item__form-group--2">
            <label
              className="add-item__label heading-secondary u-margin-bottom"
              htmlFor="price"
            >
              price
            </label>
            <input
              className={priceHasError ? 'input--error' : 'input'}
              type="text"
              placeholder="enter item price"
              id="price"
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
              defaultValue={item && item.price}
            />
          </div>

          <div className="add-item__form-group add-item__form-group--3">
            <label
              className="add-item__label heading-secondary u-margin-bottom"
              htmlFor="description"
            >
              description
            </label>
            <textarea
              rows="5"
              className={descHasError ? 'input--error' : 'input'}
              type="text"
              placeholder="enter item description"
              id="description"
              onChange={descChangeHandler}
              onBlur={descBlurHandler}
              defaultValue={item && item.description}
            />
          </div>

          <div className="add-item__form-group add-item__form-group--4">
            <label className="add-item__label heading-secondary u-margin-bottom">
              category
            </label>
            <div className="add-item__category">
              {item && item.category === 'breakfast' ? (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="breakfast"
                  className="add-item__radio-input"
                  id="breakfast"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="breakfast"
                  className="add-item__radio-input"
                  id="breakfast"
                />
              )}
              <label htmlFor="breakfast" className="add-item__radio-label">
                breakfast
              </label>

              {item && item.category === 'lunch' ? (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="lunch"
                  className="add-item__radio-input"
                  id="lunch"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="lunch"
                  className="add-item__radio-input"
                  id="lunch"
                />
              )}
              <label htmlFor="lunch" className="add-item__radio-label">
                lunch
              </label>

              {item && item.category === 'snacks' ? (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="snacks"
                  className="add-item__radio-input"
                  id="snacks"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="snacks"
                  className="add-item__radio-input"
                  id="snacks"
                />
              )}
              <label htmlFor="snacks" className="add-item__radio-label">
                snacks
              </label>

              {item && item.category === 'dinner' ? (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="dinner"
                  className="add-item__radio-input"
                  id="dinner"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="category"
                  onChange={categoryChangeHandler}
                  value="dinner"
                  className="add-item__radio-input"
                  id="dinner"
                />
              )}
              <label htmlFor="dinner" className="add-item__radio-label">
                dinner
              </label>
            </div>
          </div>

          <div className="add-item__form-group add-item__form-group--5">
            <label className="add-item__label heading-secondary u-margin-bottom">
              type
            </label>
            <div className="add-item__category">
              {item && item.type === 'veg' ? (
                <input
                  type="radio"
                  name="type"
                  onChange={typeChangeHandler}
                  value="veg"
                  className="add-item__radio-input"
                  id="veg"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="type"
                  onChange={typeChangeHandler}
                  value="veg"
                  className="add-item__radio-input"
                  id="veg"
                />
              )}
              <label htmlFor="veg" className="add-item__radio-label">
                veg
              </label>

              {item && item.type === 'non-veg' ? (
                <input
                  type="radio"
                  name="type"
                  onChange={typeChangeHandler}
                  value="non-veg"
                  className="add-item__radio-input"
                  id="non-veg"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="type"
                  onChange={typeChangeHandler}
                  value="non-veg"
                  className="add-item__radio-input"
                  id="non-veg"
                />
              )}
              <label htmlFor="non-veg" className="add-item__radio-label">
                non-veg
              </label>
            </div>
          </div>

          <div className="add-item__form-group add-item__form-group--6">
            <label
              className="add-item__label heading-secondary u-margin-bottom"
              htmlFor="image"
            >
              image
            </label>
            <input
              className={descHasError ? 'input--error' : 'input'}
              type="file"
              accept="image/*"
              multiple="false"
              placeholder="please select image"
              id="image"
              onChange={imageChangeHandler}
              onBlur={imageBlurHandler}
              defaultValue={item && item.image}
            />
          </div>

          <button
            className={
              isAdd
                ? 'button button--big button--primary u-margin-bottom-big'
                : 'button button--big button--white u-margin-bottom'
            }
          >
            confirm
          </button>
          {!isAdd && (
            <button
              type="button"
              className="button button--big button--primary u-margin-bottom-big"
              onClick={() => {
                deleteHandler(itemId);
              }}
            >
              delete
            </button>
          )}
        </form>
      ) : (
        <>
          <h1 className="u-margin-left">Login to add items</h1>
          <button
            type="button"
            className="button button--big button--primary"
            onClick={() => navigate('/ologin')}
          >
            login
          </button>
        </>
      )}
    </div>
  );
};

export default AddItem;
