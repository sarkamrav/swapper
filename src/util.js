      export const selectedItem = (item,currentitem)=>{
         console.log("item",item);
         console.log("currentitem",currentitem);
        return  item.map((item,index) =>index === currentitem.index ? 
        {...item,isActive:!item.isActive,swapitem:false}:
        {...item,swapitem:false}
          )
      }
    
    
    export const swapedItemSelected = (swapitem,currentitem)=>{
      console.log("swapitemaaaaaaaaaaa",swapitem);
      console.log("currentitemaaaaaaaaaaaaa",currentitem);
        return  swapitem.map((item,index) =>index === currentitem.index ? 
        {...item,isActive:!item.isActive,swapitem:true}:
        {...item,swapitem:true}
          )
      }
    
    export const selectAll = (item)=>{
      return  item.map(item => typeof item.isActive === "boolean" ? {...item,isActive:true}:item)
          
      }
      
    
      export const swapItem = (item,swapitem)=>{
        console.log("wswapiten",swapitem.filter(item =>item.isActive == true))
         let swapperitem = swapitem.filter(item =>item.isActive == true)
         let filterswapperitem =swapperitem.map(data =>data.isActive == true ? {...data,isActive:false,swapitem:false}:data)
        let swapeeritemdata = item.filter(item =>item.isActive !== true);
        return [...swapeeritemdata,...filterswapperitem];
       }
    
       export const swapedItem = (item,swapitem)=>{
        console.log("wswapiten",swapitem.filter(item =>item.isActive !== true))
        console.log("swapitem",swapitem);
      let filteritem = item.filter(item =>item.isActive == true)
      if( swapitem && swapitem.length>0){
       let swapperitem =swapitem.filter(data =>data.isActive !== true );
       let filterswapperitem =swapperitem.map(data =>data.isActive !== true ? {...data,isActive:false,swapitem:false}:data)
       let swapeeritemdata =filteritem.map(data =>data.isActive == true ? {...data,isActive:false,swapitem:true}:data)
        return [...filterswapperitem,...swapeeritemdata]
      }  return filteritem.map(data =>data.isActive == true ? {...data,isActive:false,swapitem:true}:data)
    }
     
    
    