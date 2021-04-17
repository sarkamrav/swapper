import React,{useState,useEffect,useReducer} from 'react';
import styled from 'styled-components';
import {selectedItem, selectAll,swapItem,swapedItem,swapedItemSelected} from './util'

const Wrapper = styled.div`
    width: 500px;
    border:1px solid black;
    background-color:white;
    min-height: 100px;`
    
    const WDiv = styled.div`
    display: flex;
   `
   const Title = styled.div`
    display:block;
    margin:3px;
   `
   const WRoot = styled.div`
   display: flex;
   margin-top:15px;`

  const  TitleWrapper = styled.div`
  display:flex;
  margin: 5%;
  justify-content: center;
  div{
      margin-right:5px;
  }
  `;
    

const WSpan = styled.button`
 background: ${props => props.isActive?'cadetblue':'white'};
 color: ${props => props.isActive?'white':'black'};
width:auto;
display:flex;
height:30px;
cursor:pointer;
backgroundColor:white`

const Button = styled.button`
height: 41px;
margin: 4%;
cursor:pointer;
`
const Pbutton = styled.button`
cursor:pointer;
`

   
const reducer =(state,action)=>{
    switch (action.type){
        case 'SUBMITDATA':
            return   { ...state ,
                item:state.item.concat([{item:action.payload.item,isActive:false,swapitem:false}])}
        case 'ADD_TO_SWAP':
            return {...state,
                item:selectedItem(state.item,action.payload),
            }
                case 'ADD_BACK_TO_SWAP':
                    return {...state,
                        swapitem:swapedItemSelected(state.swapitem,action.payload)}
        case 'SELECT_ALL':
            return {...state,
                item:selectAll(state.item)}
        case 'SWAP_ITEM':
            return  {...state,
                item:swapItem(state.item,state.swapitem),
                swapitem:swapedItem(state.item,state.swapitem),
            }
        case 'CLEAR_ALL':
            return {...state,
                swapitem:[]}
            default:
                return state;
    }
    
}

const Swap = ()=>{
const [data,dispatch] = useReducer(reducer,{item:[],swapitem:[]})
const [swapitem,updatedswapitem] = useState([])

let [item,updatedItem] = useState('');

useEffect(()=>{
    dispatch({type:'SWAP_ITEM'});
},[item,swapitem])

const nameChangeHandler =(e)=>{
    updatedItem(e.target.value)
}

const swapdata =()=>{
    dispatch({type:'SWAP_ITEM'});
}


const submitData =(e) =>{
    e.preventDefault();
    if(item.trim().length>0)  {
dispatch({
        type :'SUBMITDATA',
payload:{
    item,
}
});

updatedItem('');
    }
}
console.log("state",swapitem);

return (
        <>
     <TitleWrapper>
      <div>Add Items to the Swapper: </div>
      <input type = 'text' name ='item' value ={item} onChange ={(e)=>nameChangeHandler(e)} />
    <Pbutton onClick ={submitData} >Add</Pbutton>
    </TitleWrapper>
  <WRoot>

    <div>
    <Title>  Available: <Pbutton onClick={()=>{dispatch({type:'SELECT_ALL'})}}>SelectAll</Pbutton></Title>
    <Wrapper>
 
    {data.item && data.item.length>0&&(
      <WDiv>
        {data.item.map((data1,index)=>{
            return( <WSpan id ={index} isActive ={data1.isActive} onClick={()=>{dispatch({type:'ADD_TO_SWAP',payload:{index}})}}>{data1.item}</WSpan> 
                )
        })}
    </WDiv>
        
    )}
    
        </Wrapper>
    </div>
  <Button onClick={swapdata}> &#8644;</Button>
 <div>
 <Title>Selected: <Pbutton onClick={()=>{dispatch({type:'CLEAR_ALL'})}}>Clear All</Pbutton></Title>
        <Wrapper>
     
        {data.swapitem && data.swapitem.length>0&&(
      <WDiv>
        {data.swapitem.map((data1,index)=>{
        return    (
                <WSpan id ={index} isActive ={data1.isActive} onClick={()=>{dispatch({type:'ADD_BACK_TO_SWAP',payload:{index}})}}>
                    {data1.item}
                </WSpan>
        ) 
        })}
    </WDiv>
        
    )}
        </Wrapper>
 </div>
       
        </WRoot>
    </>
    )
    
}

export default Swap;