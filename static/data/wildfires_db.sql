-- CREATE WILDFIRES AND DETAILS TABLES

-- Drop tables
drop table wildfires;
drop table temps;

create table temps (
	county_id INT,
	month_number INT,
	primary key (county_id, month_number),
	month_name varchar,
	county varchar,
	fahrenheit numeric
);

create table wildfires (
	fire_id int primary key,
	county_id INT,
	month_number INT,
	foreign key (county_id, month_number) references temps(county_id, month_number),
	year text,
	state varchar,
	wildfire_name varchar,
	acres_burned INT,
	counties varchar,
	location varchar,
	latitude numeric,
	longitude numeric,
	start_datetime timestamp,
	extinguished_datetime timestamp,
	duration_days int
);


-- import csv into tables
---- verify data is inserted accurately
select * from wildfires;
select * from temps;


select * from wildfires
where wildfire_name = 'Girasol Fire';