# import dependancies
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

from config import key

#################################################
# Database Setup
#################################################
engine = create_engine(key, echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
             
# Save reference to the table: table has to have a primary key for automap to work
Wildfire = Base.classes.wildfires
Temp = Base.classes.temps

#################################################
# Flask Setup
#################################################
app = Flask(__name__, template_folder="templates")

# this keeps flask jsonify from alphabetically ordering the json data
app.config['JSON_SORT_KEYS'] = False

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Serve homepage template"""
    return render_template('index.html')
    

@app.route("/api/v1.0/wildfire_names")
def wildfire_names():
    """List all wildfire names."""
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """List all wildfire names"""
    # Query all wildfires
    results = session.query(Wildfire.wildfire_name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

@app.route("/api/v1.0/wildfire_data")
def wildfires_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of wildfire data"""
    # Query all 2019 wildfires
    results = session.query(Wildfire.wildfire_name, Wildfire.fire_id,Wildfire.acres_burned, Wildfire.year, Temp.month_name, Temp.fahrenheit, Wildfire.state, Wildfire.counties, Wildfire.location, Wildfire.latitude, Wildfire.longitude).join(Wildfire).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_wildfires
    all_wildfires = []
    for wildfire_name, fire_id, acres_burned, year, month_name, fahrenheit, state, counties, location, latitude, longitude in results:
        wildfire_dict = {}
        wildfire_dict["wildfire_name"] = wildfire_name
        wildfire_dict["fire_id"] = fire_id
        wildfire_dict["acres_burned"] = acres_burned
        wildfire_dict["year"] = year
        wildfire_dict["month"] = month_name
        wildfire_dict["average_temperature(F)"] = fahrenheit
        wildfire_dict["state"] = state
        wildfire_dict["counties"] = counties
        wildfire_dict["location"] = location
        wildfire_dict["latitude"] = latitude
        wildfire_dict["longitude"] = longitude
        all_wildfires.append(wildfire_dict)

    return jsonify(all_wildfires)

@app.route("/api/v1.0/wildfire_data/<wildfire_name>")
def wildfire_search_by__name(wildfire_name):
    """Fetch the wildfire data by name who matches
       the path variable supplied by the user, or a 404 if not."""
   
    canonicalized = wildfire_name.replace(" ", "").lower()
    for fire in Wildfire:
        search_term = fire["wildfire_name"].replace(" ", "").lower()

        if search_term == canonicalized:
            return jsonify(fire)

    return jsonify({"error": "Character not found."}), 404

if __name__ == '__main__':
    app.run(debug=True)