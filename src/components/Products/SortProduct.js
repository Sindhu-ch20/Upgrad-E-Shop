import React, { useEffect } from "react";
import { FormControl, FormHelperText ,MenuItem, Select } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';

const SortProduct = ({pdtCat, setProductCatalogue, refreshCat, setRefreshCat}) => {
  const [options] = useState([
    {text : "Default", value : "default"},
    {text : "Price: High to Low", value : "hightolow"},
    {text : "Price: Low to High", value : "lowtohigh"},
    {text : "Newest", value : "newest"}
  ]);  

  const [sortValue, setSortValue] = useState("default");
  
  const StyledArrow = styled(KeyboardArrowDownIcon)({
    borderLeft: '1px solid gray',
    paddingLeft: '8px',
  });

  const handleSortFilter = (e) =>{
    setSortValue(e.target.value);
  };
  
  useEffect(()=>{
    if(sortValue === 'default'){
      setProductCatalogue(pdtCat.reverse());
    } else if(sortValue === 'newest'){
      setProductCatalogue(pdtCat.reverse());
    } else if(sortValue === 'hightolow'){
      let newPdtSort = pdtCat.sort((a,b)=>b.price - a.price);
      setProductCatalogue(newPdtSort);
    } else if(sortValue === 'lowtohigh'){
      let newPdtSort = pdtCat.sort((a,b)=>a.price - b.price);
      setProductCatalogue(newPdtSort);
    }
    setRefreshCat(!refreshCat);
  },[sortValue]);
  
  return (
    <>
      <FormControl sx={{display : "block", padding : "0vh 5vw"}}>
      <FormHelperText sx={{marginLeft : 0, color : "black"}}>Sort By:</FormHelperText>
        <Select
          id="sort-value"
          size="small"
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{color : "gray"}}>Select...</span>;
            } else{
                return options.find((item)=> item.value === selected).text;
            }
          }}
          displayEmpty
          IconComponent={StyledArrow}
          sx={{width : 1/5, '& .MuiSelect-icon': {
            transform: 'none',
          },
          '&:hover .MuiSelect-icon': {
            transform: 'none',
          }
          }}
          value={sortValue}
          onChange={handleSortFilter}>
            {
                options.map((item, index)=>(<MenuItem key={index} value={item.value}>{item.text}</MenuItem>))
            }
        </Select>
      </FormControl>
    </>
  );
};

export default SortProduct;
