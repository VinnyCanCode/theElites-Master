import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState } from 'react';
import { useEffect } from 'react';

const animatedComponents = makeAnimated();

const CartSizeSelect = (props) => {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const options = [];
  props.sizes.map((size) => options.push({ value: size, label: size }));

  useEffect(() => {
    if (!selectedOptions) {
      return;
    }
    if (selectedOptions.length > props.maxValue) {
      // console.log(selectedOptions.length - 2);
      // console.log(`maxValue: ${props.maxValue}`);
      return setSelectedOptions(selectedOptions.pop());
    }
  }, [selectedOptions]);

  const handleChange = (value) => {
    if (!selectedOptions) {
      return setSelectedOptions(value);
    }

    if (selectedOptions.length === props.maxValue) {
      return setSelectedOptions(selectedOptions.pop());
    }

    return setSelectedOptions(value);
  };

  return (
    <Select
      className="cart__sizeSelect"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      value={selectedOptions}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default CartSizeSelect;
