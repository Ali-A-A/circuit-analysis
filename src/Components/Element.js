import React, {Component, Fragment} from "react";
import logo0 from '../Images/0.png'
import logo1 from '../Images/1.png'
import logo2 from '../Images/2.png'
import logo3 from '../Images/3.png'
import logo4 from '../Images/4.png'
import logo5 from '../Images/5.png'
import logo6 from '../Images/6.png'
import logo7 from '../Images/7.png'
import logo8 from '../Images/8.png'
import logo9 from '../Images/9.png'
import logonull from '../Images/null.png'
import res from '../Images/resistance.png'
import res_ver from '../Images/vertical.png'
import vol from '../Images/voltage_source5.png'
import vol_dep from '../Images/voltage_source_dep5.png'
import vol_rtl from '../Images/vol_rtl5.png'
import vol_dep_rtl from '../Images/vol_dep_rtl5.png'
import vol_ver from '../Images/voltage4_ver.png'
import vol_dep_ver from '../Images/voltage4_dep_ver.png'
import vol_ver_rtl from '../Images/vol_ver_rtl.png'
import vol_dep_ver_rtl from '../Images/vol_dep_ver_rtl.png'
import wire from '../Images/wire.png'
import wire_ver from '../Images/wire_ver.png'
import current from '../Images/current_source5.png'
import current_rtl from '../Images/current_rtl5.png'
import current_ver from '../Images/current4_ver.png'
import current_ver_rtl from '../Images/current_ver_rtl.png'
import gnd from '../Images/ground.png';



const Element = ({typeDot , startSeg1 , endSeg1 , startSeg2 , endSeg2 , checkPlaces , number , nodeNumber}) => {
    let is_gnd;
    if(nodeNumber !== undefined) number = nodeNumber;
    if(startSeg1 == "8") is_gnd = true;
    return (
        <Fragment>
            <div className={"col-4 col-sm-4 " + typeDot}>
                
                {is_gnd && <img data-toggle="tooltip" data-placement="top" title="Ground" src={gnd} className={"vol_ver"}/>}
                {checkPlaces[startSeg1][endSeg1] && <img data-toggle={checkPlaces[startSeg1][endSeg1].id ? "tooltip" : undefined} data-placement="top" title={checkPlaces[startSeg1][endSeg1].id ? "Voltage " + checkPlaces[startSeg1][endSeg1].id : ""} src={checkPlaces[startSeg1][endSeg1].type == "res" ? res_ver : checkPlaces[startSeg1][endSeg1].type == "vol" ? vol_ver_rtl : checkPlaces[startSeg1][endSeg1].type == "vol_dep" ? vol_dep_ver_rtl : checkPlaces[startSeg1][endSeg1].type == "wire" ? wire_ver : checkPlaces[startSeg1][endSeg1].type == "current" ? current_ver_rtl : undefined} className={checkPlaces[startSeg1][endSeg1].type + "_ver"}></img>}
                {checkPlaces[endSeg1][startSeg1] && <img data-toggle={checkPlaces[endSeg1][startSeg1].id ? "tooltip" : undefined} data-placement="top" title={checkPlaces[endSeg1][startSeg1].id ? "Voltage " + checkPlaces[endSeg1][startSeg1].id : ""} src={checkPlaces[endSeg1][startSeg1].type == "res" ? res_ver : checkPlaces[endSeg1][startSeg1].type == "vol" ? vol_ver : checkPlaces[endSeg1][startSeg1].type == "vol_dep" ? vol_dep_ver : checkPlaces[endSeg1][startSeg1].type == "wire" ? wire_ver : checkPlaces[endSeg1][startSeg1].type == "current" ? current_ver : undefined} className={checkPlaces[endSeg1][startSeg1].type + "_ver"}></img>}
                <img src={number == "0" ? logo0 : number == "1" ? logo1 : number == "2" ? logo2 : number == "3" ? logo3 :
                    number == "4" ? logo4 : number == "5" ? logo5 : number == "6" ? logo6 : number == "7" ? logo7 : number == "8" ? logo8 : number == "9" ? logo9 : logonull} className={"dot"}></img>
                {checkPlaces[startSeg1][endSeg1] && <p className={"ver-value"}>{checkPlaces[startSeg1][endSeg1].value}{checkPlaces[startSeg1][endSeg1].equation}{checkPlaces[startSeg1][endSeg1].unit}</p>} 
                {checkPlaces[endSeg1][startSeg1] && <p className={"ver-value"}>{checkPlaces[endSeg1][startSeg1].value}{checkPlaces[endSeg1][startSeg1].equation}{checkPlaces[endSeg1][startSeg1].unit}</p>}
                {checkPlaces[startSeg2][endSeg2] && <p className={"hor-value"}>{checkPlaces[startSeg2][endSeg2].value}{checkPlaces[startSeg2][endSeg2].equation}{checkPlaces[startSeg2][endSeg2].unit}</p>}
                {checkPlaces[endSeg2][startSeg2] && <p className={"hor-value"}>{checkPlaces[endSeg2][startSeg2].value}{checkPlaces[endSeg2][startSeg2].equation}{checkPlaces[endSeg2][startSeg2].unit}</p>}
                {checkPlaces[startSeg2][endSeg2] && <img data-toggle={checkPlaces[startSeg2][endSeg2].id ? "tooltip" : undefined} data-placement="top" title={checkPlaces[startSeg2][endSeg2].id ? "Voltage " + checkPlaces[startSeg2][endSeg2].id : ""} src={checkPlaces[startSeg2][endSeg2].type == "res" ? res : checkPlaces[startSeg2][endSeg2].type == "vol" ? vol : checkPlaces[startSeg2][endSeg2].type == "vol_dep" ? vol_dep : checkPlaces[startSeg2][endSeg2].type == "wire" ? wire : checkPlaces[startSeg2][endSeg2].type == "current" ? current : undefined} className={checkPlaces[startSeg2][endSeg2].type}></img>}
                {checkPlaces[endSeg2][startSeg2] && <img data-toggle={checkPlaces[endSeg2][startSeg2].id ? "tooltip" : undefined} data-placement="top" title={checkPlaces[endSeg2][startSeg2].id ? "Voltage " + checkPlaces[endSeg2][startSeg2].id : ""} src={checkPlaces[endSeg2][startSeg2].type == "res" ? res : checkPlaces[endSeg2][startSeg2].type == "vol" ? vol_rtl : checkPlaces[endSeg2][startSeg2].type == "vol_dep" ? vol_dep_rtl : checkPlaces[endSeg2][startSeg2].type == "wire" ? wire : checkPlaces[endSeg2][startSeg2].type == "current" ? current_rtl : undefined} className={checkPlaces[endSeg2][startSeg2].type}></img>}
            </div>
        </Fragment>
    );
  }
  
  export default Element;
