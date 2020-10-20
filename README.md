# 2019 California Wildfire Dashboard
Deployment Link: https://zcheatle5.github.io/ca-wildfire-dashboard/

## Project Proposal
- Design an interactive JavaScript dashboard webpage containing an interactive leaflet map, time lapse visualization, and data table for the 2019 California Wildfires where the user can filter the data by month. Dashboard will be initialized with flask application that will store all data into a PostgreSQL database and create an API.
  
   ### Team Members:
      - Zac Cheatle
      - Adam Mcvey
      - Jiuhe (Rosa) Zhu
      - Javane Jones
      - Paule Nguendang
    
  ### Tools Used:
    - Python
      - Pandas
      - Flask
    - JavaScript
      - Leaflet
      - D3
      - Plotly
    - HTML/CSS
    - PostgreSQL
    - Excel
  
  ### Data Used:
  - [California Wildfire Incidents](https://www.kaggle.com/ananthu017/california-wildfire-incidents-20132020).
  - [2019 Avg Monthly Temp](temps.csv).
  - This [website](https://www.convertcsv.com/csv-to-geojson.htm) is used to convert the csv files into GeoJSON.
  
## Extract, Transform, Load (ETL) Phase

  ### Part I - Data Extraction and Munging
  1. Utilized Pandas to clean the California Fire Incidents csv to filter for 2019 data and remove unwanted columns.
  2. Convert csv files into GeoJSON.
  2. Used Excel to prepare the Wildfires and Temps csv for import into PostgreSQL.


  ### Part II - PostgreSQL Database
  1. Created a wildfires_db with the following tables:
      - Temps (primary key = county_id and month_number)
      - Wildfires (primary key = fire_id)

## API and Interactive Dashboard Phase

  ### Part III - Flask App
  1. Utilized SQLAlchemy to connect app to our postgreSQL database tables.
  2. Provided 3 API routes for homepage, wildfire_names, wildfire_data. 
  3. Wrote query to join Wildfires and Temps tables to build API route.
  4. Added "app.config['JSON_SORT_KEYS'] = False" to prevent JSON from alphabetically ordering the Jsonified data. 

  ### Part IV - Interactive JavaScript

  - Leaflet Interactive Map
  - Leaflet Time Lapse Map
  - Interactive JavaScript Table
  - plotly charts
