import React, {useEffect, useState} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ProductCategory = ({data, setCategory}) => {

  const[categories, setCategories] = useState(["all"]);
  const[activeCategory, setActiveCategory] = useState("all");

  const handleCategoryChange = (e) => {
    setActiveCategory(e.target.value);
    setCategory(e.target.value)
  }

  useEffect(()=>{
    if(data) setCategories(["all", ...data])
  },[data]);

  return (
    <>
      <ToggleButtonGroup
        value={activeCategory}
        onChange={handleCategoryChange}
        exclusive
        aria-label="Platform"
        sx={{display : "block", textAlign : "center", marginTop : 2}}>
        {
            categories.map((item, index)=>(<ToggleButton sx={{ '&.Mui-selected': { color: 'gray' } }} key={index} value={item}>{item.toUpperCase()}</ToggleButton>))
        }
      </ToggleButtonGroup>
    </>
  );
};

export default ProductCategory;
