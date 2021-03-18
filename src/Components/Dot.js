import React, {Component} from "react";

import Element from "./Element";

const Dot = ({elements , nodes}) => {
    let checkPlaces = new Array(10);
    for(let i = 0 ; i < checkPlaces.length ; i++) checkPlaces[i] = new Array(10);
    elements.map(x => {
        checkPlaces[parseInt(x.startSeg)][parseInt(x.endSeg)] = {
            type : x.name,
            value : x.value,
            unit : x.unit,
            equation : x.equation,
            id : x.id,
        }
    })
    return (
        <div className={"container"}>
        <div class="row">
            <Element nodeNumber={nodes[0] ? nodes[0].nodeNumber : undefined} typeDot={"dots-up"}  startSeg1={1}  endSeg1={4}  startSeg2={1}  endSeg2={2}  checkPlaces={checkPlaces} number={"1"}></Element>
            
            <Element nodeNumber={nodes[1] ? nodes[1].nodeNumber : undefined} typeDot={"dots-up"}  startSeg1={2}  endSeg1={5}  startSeg2={2}  endSeg2={3}  checkPlaces={checkPlaces} number={"2"}></Element>
            <Element nodeNumber={nodes[2] ? nodes[2].nodeNumber : undefined} typeDot={"dots-up"}  startSeg1={3}  endSeg1={6}  startSeg2={3}  endSeg2={0}  checkPlaces={checkPlaces} number={"3"}></Element>

            <div class="w-100 d-none d-md-block"></div>
            <Element nodeNumber={nodes[3] ? nodes[3].nodeNumber : undefined} typeDot={"dots-mid"}  startSeg1={4}  endSeg1={7}  startSeg2={4}  endSeg2={5}  checkPlaces={checkPlaces} number={"4"}></Element>
            <Element nodeNumber={nodes[4] ? nodes[4].nodeNumber : undefined} typeDot={"dots-mid"}  startSeg1={5}  endSeg1={8}  startSeg2={5}  endSeg2={6}  checkPlaces={checkPlaces} number={"5"}></Element>
            <Element nodeNumber={nodes[5] ? nodes[5].nodeNumber : undefined} typeDot={"dots-mid"}  startSeg1={6}  endSeg1={9}  startSeg2={6}  endSeg2={0}  checkPlaces={checkPlaces} number={"6"}></Element>

            <div class="w-100 d-none d-md-block"></div>

            <Element nodeNumber={nodes[6] ? nodes[6].nodeNumber : undefined} typeDot={"dots-mid"}  startSeg1={7}  endSeg1={0}  startSeg2={7}  endSeg2={8}  checkPlaces={checkPlaces} number={"7"}></Element>
            <Element nodeNumber={nodes[7] ? nodes[7].nodeNumber : undefined} typeDot={"dots-mid"}  startSeg1={8}  endSeg1={0}  startSeg2={8}  endSeg2={9}  checkPlaces={checkPlaces} number={"8"}></Element>
            <Element nodeNumber={nodes[8] ? nodes[8].nodeNumber : undefined} typeDot={"dots-mid"}  startSeg1={9}  endSeg1={0}  startSeg2={9}  endSeg2={0}  checkPlaces={checkPlaces} number={"9"}></Element>

        </div>
        </div>
    );
  }
  
  export default Dot;
