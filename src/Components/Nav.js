import React, {Component} from "react";
import res from '../Images/resistance.png'
import volt from '../Images/voltage_source.png'
import volt_dep from '../Images/votage_source_dep.png'
import wire from '../Images/wire.png'
import current from '../Images/current_source.png'

class Nav extends Component {
    render() {
      return (
        <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">Place Part</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#"><img src={wire} data-toggle="modal" data-target="#modalWire" className={"resistance"}></img> <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#"><img src={res} data-toggle="modal" data-target="#modalRes" className={"resistance"}></img> <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#"><img src={volt} data-toggle="modal" data-target="#modalVol" className={"volt"}></img> <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#"><img src={current} data-toggle="modal" data-target="#modalCurrent" className={"volt"}></img> <span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
      );
    }
  }
  
  export default Nav;


