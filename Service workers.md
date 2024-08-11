Below are the tables

Service workers Table
First name
last name
role (owner, worker)
start date
employee number primary key


Service contract Table 
contract id
name
status (draft, approved, active, inactive)
owner_id -> foreign key employee number 
created_at
updated at


Service worker contract mapping Table
employee number 
contract id
created_at 
updated at



CRUD

Add worker
delete worker
update


Add contract
update contract status
delete


offboard onboard worker to contract (only contractor/Admin can do)

