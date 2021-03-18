import React, {useState} from "react";
import Dot from './Components/Dot'
import './App.css';
import Nav from "./Components/Nav";
import Modal from "./Components/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {lusolve}  from "mathjs";

var adjacency_list = [[] , [] , [] , [] , [] , [] , [] , [] , []];
var nodes = new Array(9);
var volId = 1;

const fill_nodes = () => {
  for(let i = 0 ; i < 9 ; i++) {
    nodes[i] = {nodeNumber : -1};
  }
} 

const fill_lists = (elements) => {
  elements.map(el => {
    adjacency_list[parseInt(el.startSeg - 1)].push({number : parseInt(el.endSeg - 1) , type : el.name , value : parseInt(el.value) , start : true});
    adjacency_list[parseInt(el.endSeg - 1)].push({number : parseInt(el.startSeg - 1) , type : el.name , value : parseInt(el.value) , start : false});
  })
  fill_nodes();
}

const dfs = (number , nodeNumber) => {
  for(let i = 0 ; i < adjacency_list[number].length ; i++) {
    if((adjacency_list[number][i].type === "wire") && (nodes[adjacency_list[number][i].number].nodeNumber == -1)) {
      nodes[adjacency_list[number][i].number].nodeNumber = nodeNumber;
      dfs(adjacency_list[number][i].number , nodeNumber);
    }
  }
}

const generate_b_matrix = (number_of_nodes , number_of_vol , elements) => {
  let b_matrix = new Array(number_of_nodes);
  let index_of_vol = 0;
  for(let i = 0 ; i < number_of_nodes ; i++) b_matrix[i] = new Array(number_of_vol);
  for(let i = 0 ; i < elements.length ; i++) {
    if(elements[i].name === "vol") {
      for(let j = 0 ; j < 9 ; j++) {
        for(let k = 1 ; k <= number_of_nodes ; k++) {
          let data = 0;
          if((nodes[j].nodeNumber === k) && (parseInt(elements[i].startSeg) == j+1)) data = -1;
          else if((nodes[j].nodeNumber === k) && (parseInt(elements[i].endSeg) == j+1)) data = 1;
          if(!b_matrix[k-1][index_of_vol]) b_matrix[k-1][index_of_vol] = data;
        }
      }
      index_of_vol += 1;
    }
  }
  return b_matrix;
}

const generate_g_matrix = (number_of_nodes) => {
  let g_matrix = new Array(number_of_nodes);
  for(let i = 0 ; i < number_of_nodes ; i++) g_matrix[i] = new Array(number_of_nodes);
  for(let i = 0 ; i < number_of_nodes ; i++) {
    var data = 0;
    for(let j = 0 ; j < 9 ; j++) {
      if(nodes[j].nodeNumber === i + 1) {
        for(let k = 0 ; k < adjacency_list[j].length ; k++) {
          if(adjacency_list[j][k].type === "res") data += (1 / adjacency_list[j][k].value); 
        }
      }
    }
    g_matrix[i][i] = data;
  }
  for(let i = 0 ; i < number_of_nodes ; i++) {
    for(let j = 0 ; j < number_of_nodes ; j++) {
      if(i !== j) {
        var data1 = 0;
        for(let k = 0 ; k < 9 ; k++) {
          if(nodes[k].nodeNumber === i + 1) {
            adjacency_list[k].map(el => {
              if((nodes[el.number].nodeNumber === j + 1) && el.type === "res") data1 -= (1 / el.value);
            })
          }
        }
        g_matrix[i][j] = data1;
      }
    }
  }
  return g_matrix;
}

const assign_node_numbers = () => {
  let nodeNumber = 0;
  nodes[7].nodeNumber = nodeNumber;
  dfs(7 , nodeNumber);
  nodeNumber += 1;
  for(let i = 0 ; i < 9 ; i++) {
    if((nodes[i].nodeNumber === -1) && (adjacency_list[i].length !== 0)) {
      nodes[i].nodeNumber = nodeNumber;
      dfs(i , nodeNumber);
      nodeNumber += 1;
    }
  }
  return nodeNumber - 1;
}

const find_number_of_voltage_sources = (elements) => {
  let number_of_vol = 0;
  elements.map(el => {
    if(el.name === "vol") number_of_vol += 1;
  });
  return number_of_vol;
}

const generate_c_matrix = (number_of_nodes , number_of_vol , b_matrix) => {
  let c_matrix = new Array(number_of_vol);
  for(let i = 0 ; i < number_of_vol ; i++) c_matrix[i] = new Array(number_of_nodes);
  for(let i = 0 ; i < b_matrix.length ; i++) {
    for(let j = 0 ; j < b_matrix[i].length ; j++) {
      c_matrix[j][i] = b_matrix[i][j];
    }
  }
  return c_matrix;
}

const generate_a_matrix = (number_of_nodes , number_of_vol , elements) => {
  let a_matrix = new Array(number_of_nodes + number_of_vol);
  for(let i = 0 ; i < number_of_nodes + number_of_vol ; i++) a_matrix[i] = new Array(number_of_nodes + number_of_vol);
  let g_matrix = generate_g_matrix(number_of_nodes);
  let b_matrix = generate_b_matrix(number_of_nodes , number_of_vol , elements);
  let c_matrix = generate_c_matrix(number_of_nodes , number_of_vol , b_matrix);
 
  for(let i = 0 ; i < number_of_nodes ; i++) {
    for(let j = 0 ; j < number_of_nodes ; j++) {
      a_matrix[i][j] = g_matrix[i][j];
    }
  }

  for(let i = 0 ; i < b_matrix.length ; i++) {
    for(let j = g_matrix.length ; j < number_of_nodes + number_of_vol ; j++) {
      a_matrix[i][j] = b_matrix[i][j - g_matrix.length];
    }
  }
  for(let i = g_matrix.length ; i < number_of_nodes + number_of_vol ; i++) {
    for(let j = 0 ; j < g_matrix.length ; j++) {
      a_matrix[i][j] = c_matrix[i - g_matrix.length][j];
    }
  }
  for(let i = number_of_nodes ; i < number_of_nodes + number_of_vol ; i++) {
    for(let j = number_of_nodes ; j < number_of_vol + number_of_nodes ; j++) {
      a_matrix[i][j] = 0;
    }
  }
  return a_matrix
}

const generate_i_matrix = (number_of_nodes) => {
  let i_matrix = new Array(number_of_nodes);
  for(let i = 0 ; i < number_of_nodes ; i++) {
    let sum = 0;
    for(let j = 0 ; j < 9 ; j++) {
      if(nodes[j].nodeNumber === i + 1) {
        for(let k = 0 ; k < adjacency_list[j].length ; k++) {
          if((adjacency_list[j][k].type === "current") && (adjacency_list[j][k].start === true)) sum -= adjacency_list[j][k].value;
          else if((adjacency_list[j][k].type === "current") && (adjacency_list[j][k].start === false)) sum += adjacency_list[j][k].value;
        }
      }
    }
    i_matrix[i] = sum;
  }
  return i_matrix;
}

const generate_e_matrix = (number_of_vol , elements) => {
  let e_matrix = new Array(number_of_vol);
  let index_of_vol = 0;
  for(let i = 0 ; i < elements.length ; i++) {
    if(elements[i].name === "vol") {
      e_matrix[index_of_vol] = parseInt(elements[i].value);
      index_of_vol += 1;
    }
  }
  return e_matrix;
}

const generate_z_matrix = (number_of_nodes , number_of_vol , elements) => {
  let z_matrix = new Array(number_of_nodes + number_of_vol);
  let i_matrix = generate_i_matrix(number_of_nodes)
  let e_matrix = generate_e_matrix(number_of_vol , elements)
  for(let i = 0 ; i < number_of_nodes ; i++) {
    z_matrix[i] = i_matrix[i];
  }
  for(let i = number_of_nodes ; i < number_of_vol + number_of_nodes ; i++) {
    z_matrix[i] = e_matrix[i - number_of_nodes];
  }
  return z_matrix;
}

const generate_equation_matrix = (a_matrix , z_matrix) => {
  for(let i = 0 ; i < a_matrix.length ; i++) {
    a_matrix[i].push(z_matrix[i]);
  }
  return a_matrix;
}

const swap_row = (equation_matrix , i , j) => {
  for(let k = 0 ; k <= equation_matrix.length ; k++) {
    let temp = equation_matrix[i][k];
    equation_matrix[i][k] = equation_matrix[j][k];
    equation_matrix[j][k] = temp;
  }
  return equation_matrix;
}

const abs = (x) => {
  return x < 0 ? -x : x;
}

const forward_elim = (equation_matrix) => {
  for(let k = 0 ; k < equation_matrix.length ; k++) {
    let i_max = k;
    let v_max = equation_matrix[i_max][k];
    for(let i = k+1 ; i < equation_matrix.length ; i++) {
      if(abs(equation_matrix[i][k]) > v_max){ v_max = equation_matrix[i][k]; i_max = i;}
    }
    if(!equation_matrix[k][i_max]) return k;
    if(i_max != k) equation_matrix = swap_row(equation_matrix , k , i_max);
    for(let i = k + 1 ; i < equation_matrix.length ; i++) {
      let f = equation_matrix[i][k] / equation_matrix[k][k];
      for(let j = k+1 ; j <= equation_matrix.length ; j++) {
        equation_matrix[i][j] -= equation_matrix[k][j] * f;
      }
      equation_matrix[i][k] = 0;
    }
  }
  return equation_matrix;
}

const gaussian_elimination = (equation_matrix) => {
  equation_matrix = forward_elim(equation_matrix);
  let solutions = back_sub(equation_matrix);
  return solutions;
}

const back_sub = (equation_matrix) => {
  let x = new Array(equation_matrix.length)
  for(let i = equation_matrix.length - 1 ; i >= 0 ; i--) {
    x[i] = equation_matrix[i][equation_matrix.length];
    for(let j = i + 1 ; j < equation_matrix.length ; j++) {
      x[i] -= equation_matrix[i][j] * x[j];
    }
    x[i] = x[i] / equation_matrix[i][i];
  }
  return x;
}

const analysis_circuit = (elements , setVoltagesSolutions , setCurrentSolutions , setNodesState) => {
  fill_lists(elements);
  let number_of_nodes = assign_node_numbers();
  setNodesState(nodes);
  let number_of_vol = find_number_of_voltage_sources(elements);
  let a_matrix = generate_a_matrix(number_of_nodes , number_of_vol , elements);
  let z_matrix = generate_z_matrix(number_of_nodes , number_of_vol , elements);
  // let equation_matrix = generate_equation_matrix(a_matrix , z_matrix);
  let solutions;
  try {solutions = lusolve(a_matrix , z_matrix);}
  catch(err) {solutions = undefined}
  if(solutions === undefined) solutions = [];
  let voltages_solutions = [];
  let current_solutions = [];
  for(let i = 0 ; i < number_of_nodes ; i++) voltages_solutions.push(solutions[i]);
  for(let i = number_of_nodes ; i < number_of_nodes + number_of_vol ; i++) current_solutions.push(solutions[i]);
  setVoltagesSolutions(voltages_solutions);
  setCurrentSolutions(current_solutions);
}

const clear_circuit = (setVoltagesSolutions , setCurrentSolutions , setNodesState) => {
  setVoltagesSolutions([]);
  setCurrentSolutions([]);
  setNodesState([]);
  volId = 1;
  fill_nodes();
  adjacency_list = [[] , [] , [] , [] , [] , [] , [] , [] , []];
}

const clear_all = (setElements , setVoltagesSolutions , setCurrentSolutions , setNodesState) => {
  clear_circuit(setVoltagesSolutions , setCurrentSolutions , setNodesState);
  setElements([]);
  window.location.reload(false); 
}


const App = () => {
  const [elements , setElements] = useState([]);
  const [voltages_solutions , setVoltagesSolutions] = useState([]);
  const [current_solutions , setCurrentSolutions] = useState([]);
  const [nodesState , setNodesState] = useState([]);
  volId = find_number_of_voltage_sources(elements) + 1;
 console.log(elements);
  console.log(elements)
  return (
      <div className="App">
        {!voltages_solutions.length && <Nav/>}
        <Dot elements={elements} nodes={nodesState} />
        <Modal setElements={setElements} modalName={"Resistance"}  modalId={"modalRes"}  elName="res" unit="Ω" hasValue={true} isVol={false}></Modal>
        <Modal setElements={setElements} modalName={"Independent Voltage"}  modalId={"modalVol"}  elName="vol" unit="V" hasValue={true} isVol={true} volId={volId}></Modal>
        <Modal setElements={setElements} modalName={"Wire"}  modalId={"modalWire"}  elName="wire" unit={undefined} hasValue={false} isVol={false}></Modal>
        <Modal setElements={setElements} modalName={"Independet Current"} modalId={"modalCurrent"} elName="current" unit="A" hasValue={true} isVol={false}></Modal>
        <div style={{marginTop : "5%"}}>{!voltages_solutions.length ? <div><button data-toggle="modal" data-target="#analysisModal" onClick={() => analysis_circuit(elements , setVoltagesSolutions , setCurrentSolutions , setNodesState)} type="button" class="btn btn-dark" style={{marginBottom : "5%" , marginRight : "2%"}}>Analysis</button> <button data-toggle="modal" data-target="#analysisModal" onClick={() => clear_all(setElements , setVoltagesSolutions , setCurrentSolutions , setNodesState)} type="button" class="btn btn-danger" style={{marginBottom : "5%"}}>Clear All</button></div> : <button  onClick={() => clear_circuit(setVoltagesSolutions , setCurrentSolutions , setNodesState)} type="button" class="btn btn-danger" style={{marginBottom : "5%"}}>Place Part</button>}</div>
        {voltages_solutions.map((solution , i) => {
          return(<div className={"container"}><p className={"badge badge-dark sol"}>Voltage of Node <div style={{color : "wheat" , display:"inline"}}>{i+1}</div> : <div style={{margin : "2%"}}><div style={{color : "wheat" , display:"inline"}}>{Math.floor(solution * 100000) / 100000}</div> V</div></p></div>);
        })}
        {current_solutions.map((solution , i) => {
          return(<div className={"container"}><p className={"badge badge-dark sol"}>Current of voltage <div style={{color : "wheat" , display:"inline"}}>{i+1}</div> : <div style={{margin : "2%"}}><div style={{color : "wheat" , display:"inline"}}>{Math.floor(solution * 100000) / 100000}</div> A</div></p></div>);
        })}
        <p style={{marginTop : "15%"}} >Developed By <span className={"badge badge-dark"}>Ali Abbasi Alaei</span></p>
        <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              />
      </div>
    );
}

export default App;





// [
//   {
//     "name": "wire",
//     "startSeg": "8",
//     "endSeg": "9"
//   },
//   {
//     "name": "wire",
//     "startSeg": "8",
//     "endSeg": "7"
//   },
//   {
//     "name": "res",
//     "unit": "Ω",
//     "value": "2",
//     "startSeg": "7",
//     "endSeg": "4"
//   },
//   {
//     "name": "vol",
//     "unit": "V",
//     "value": "32",
//     "startSeg": "4",
//     "endSeg": "5",
//     "id": 1
//   },
//   {
//     "name": "res",
//     "unit": "Ω",
//     "value": "4",
//     "startSeg": "5",
//     "endSeg": "6"
//   },
//   {
//     "name": "vol",
//     "unit": "V",
//     "value": "20",
//     "startSeg": "9",
//     "endSeg": "6",
//     "id": 2
//   },
//   {
//     "name": "res",
//     "unit": "Ω",
//     "value": "8",
//     "startSeg": "8",
//     "endSeg": "5"
//   }
// ]
