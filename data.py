import sqlite3
account = sqlite3.connect("accounts.db")
project = sqlite3.connect("projects.db")
employee = sqlite3.connect("Employees.db")

EMSA = account.cursor()
EMSA.execute("create table if not exists account (employee_name text,username text,password text,powers text)")

EMSP = project.cursor() 
EMSP.execute("create table if not exists projects (project_name text,date ,description text)") 

EMSE = employee.cursor()
EMSE.execute("create table if not exists employees (employee_name text,projectName text,started date,finished date,date date)")

account.commit()
account.close()
project.commit()
project.close()
employee.commit()
employee.close()