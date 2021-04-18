import React,{useState,useEffect,useReducer} from 'react';
import styled from 'styled-components';
import {selectedItem, selectAll,swapItem,swapedItem,swapedItemSelected} from './util'

const Wrapper = styled.div`
    width: 370px;
    border: 1px solid lightgrey;;
    background-color:#EDF4FA;
    min-height: 46px;
    span{
        margin-bottom: 12px;
        display: inline-block;
        font-weight: 450;
        font-size: 18px;
        border-bottom: 1px solid black;
    }
    `
    const Span =styled.span`
    margin-top: 23px;
    display:inline-block;
    border-bottom:1px solid black;
    font-size: 20px;
    font-family: auto;`;

    const WDiv = styled.div`
    display: flex;
    display: flex;
    width: auto;
    flex-wrap: wrap;
    
   `
   const Title = styled.div`
    display:block;
    font-size: 12.5px;
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
 background: ${props => props.isActive? '#45a4cc':'white'};
 color: ${props => props.isActive?'white':'black'};
width:auto;
display:flex;
margin:1px;
height: 20px;
border: none;
font-size: 12px;
cursor:pointer;
padding: 2px 10px 2px 10px;
align-items: center;
justify-content: center;
backgroundColor:white`

const Button = styled.button`
height: 41px;
margin: 2% 2%;
cursor:pointer;
background:white;
border:none;
outline: none;
:hover{
    outline: none;
}
`
const Pbutton = styled.button`
cursor:pointer;
color:#45a4cc;
background:white;
font-size: 12.5px;
border:none;
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
const [data,dispatch] = useReducer(reducer,{item:[ {item: "0-10", isActive: false, swapitem: false},
{item: "10-20", isActive: false, swapitem: false},
{item: "20-30", isActive: false, swapitem: false},
{item: "30-40", isActive: false, swapitem: false},
{item: "40-60", isActive: false, swapitem: false},
{item: "60-80", isActive: false, swapitem: false}],swapitem:[{item: "100-110", isActive: false, swapitem: true},
{item: "110-500", isActive: false, swapitem: true},
{item: "500-1000", isActive: false, swapitem: true},
{item: "1000-5000", isActive: false, swapitem: true},
{item: "5000-10000", isActive: false, swapitem: true},
{item: "10000-50000", isActive: false, swapitem: true},]})
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
console.log("state",data);

return (
        <>
     {/* <TitleWrapper>
      <div>Add Items to the Swapper: </div>
      <input type = 'text' name ='item' value ={item} onChange ={(e)=>nameChangeHandler(e)} />
    <Pbutton onClick ={submitData} >Add</Pbutton>
    </TitleWrapper> */}
   <Span>Mock up</Span>
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