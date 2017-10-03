import React, { Component } from 'react';
import API from './API';
import RemineTable from './components/Table/RemineTable/RemineTable';

class Test extends Component {
	
	constructor(){
		super();
		this.state = {
			locations: [],
			bedCount: {},
			buildingTypes: []
		}
		this.getLocations();
	}
	
	getLocations() {
		let self = this;
		API.getLocations().then((response) => {
			self.setState({
                locations: response.data,
				filteredLocations: response.data
            });
		});
		API.getBuildingTypes().then((response) => {
			self.setState({
                buildingTypes: response.data
            });
		});
	}
	
	onFilterChange(dataKey, event){
		let filteredLocations = [];
		let locations =  this.state.locations;
		if(event.target.value.length>0){
			for(var i =0; i<locations.length; i++){
				if(locations[i][dataKey] == event.target.value)
					filteredLocations.push(locations[i]);
			}
		}else{
			filteredLocations = locations;
		}
		this.setState({
			filteredLocations: filteredLocations
		});
	}
	
    render() {
		let locations = this.state.filteredLocations;
        return (
            <div className="testContainer">
                <div className="filterContainer">
                    <input type="text" name="beds" placeholder="No. of Beds" onChange={this.onFilterChange.bind(this, 'beds')} />
					<input type="text" name="baths" placeholder="No. of Baths" onChange={this.onFilterChange.bind(this, 'baths')} />
					<select name="buildingType" placeholder="Building Type" onChange={this.onFilterChange.bind(this, 'buildingType')}>
						<option value="">Please select</option>
						{this.state.buildingTypes.map(type => (
							<option value={type.name}>{type.name}</option>
						))}
					</select>
                </div>
                <RemineTable properties={locations} />
            </div>
        );
    }
}

export default Test;
