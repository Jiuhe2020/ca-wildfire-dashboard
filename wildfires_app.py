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
    results = session.query(Wildfire.wildfire_name, Wildfire.fire_id, Wildfire.year, Temp.month_name, Temp.fahrenheit, Wildfire.state, Wildfire.counties, 
    Wildfire.location, Wildfire.latitude, Wildfire.longitude, Wildfire.start_datetime, Wildfire.extinguished_datetime, Wildfire.duration_days, Wildfire.acres_burned).join(Wildfire).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_wildfires
    all_wildfires = []
    for wildfire_name, fire_id, year, month_name, fahrenheit, state, counties, location, latitude, longitude, start_datetime, extinguished_datetime, duration_days, acres_burned in results:
        wildfire_dict = {}
        wildfire_dict["wildfire_name"] = wildfire_name
        wildfire_dict["fire_id"] = fire_id
        wildfire_dict["year"] = year
        wildfire_dict["month"] = month_name
        wildfire_dict["average_temperature(F)"] = fahrenheit
        wildfire_dict["state"] = state
        wildfire_dict["counties"] = counties
        wildfire_dict["location"] = location
        wildfire_dict["latitude"] = latitude
        wildfire_dict["longitude"] = longitude
        wildfire_dict["start_date"] = start_datetime
        wildfire_dict["extinguished_date"] = extinguished_datetime
        wildfire_dict["fire_duration(days)"] = duration_days
        wildfire_dict["acres_burned"] = acres_burned
        all_wildfires.append(wildfire_dict)

    return jsonify(all_wildfires)

if __name__ == '__main__':
    app.run(debug=True)