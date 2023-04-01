from flask import Flask ,render_template,request, jsonify , make_response
import sqlite3
import os
import json


def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump([data], fp, indent=2)


currentdirectory = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)
@app.route('/')
def main():
    return render_template("index.html")
##################################################################
#       FOR WORKS
@app.route('/resault',methods = ["GET","POST"])
def workhour():
    reqJ = request.get_data()
    data = json.loads(str(reqJ)[2:-1])
    print(data['name'])
    res = make_response(jsonify({"message":"JSON recieved"}),200)

    connection = sqlite3.connect("./Employees.db")
    cr = connection.cursor()
    name = data['name']
    projectName = data['Pname']
    started = data['startT']
    finished = data['endT']
    date = data['date']
    cr.execute("INSERT INTO employees(employee_name,projectName,started,finished,date) VALUES (?,?,?,?,?)",(name,projectName,started,finished,date))
    connection.commit() 
    connection.close()

    # adding the data to json File
    account = sqlite3.connect("./Employees.db")
    cr = account.cursor()
    cr.execute("SELECT * from employees")
    result  = cr.fetchall()
    dataW = {}
    i = 1
    for row in result:
        dataW.update({f"work{i}":{}})
        dataW[f"work{i}"]["employeeName"] = row[0]
        dataW[f"work{i}"]["projectName"] = row[1]
        dataW[f"work{i}"]["startT"] =   row[2]
        dataW[f"work{i}"]["endT"] =   row[3]
        dataW[f"work{i}"]["date"] =   row[4]
        i = i+1

        writeToJSONFile('/ESM/static/js','works',dataW)
    return res

@app.route('/delet_all_works',methods = ["GET","POST"])
def clear_all_worksData():
    reqJ = request.get_data()
    data = json.loads(str(reqJ)[2:-1])
    res = make_response(jsonify({"message":"delet works done"}),200)
    connection = sqlite3.connect("./Employees.db")
    cr = connection.cursor()
    Employee_Name = data['works_name_delete']
    cr.execute(f"delete from employees where employee_name = '{Employee_Name}'")
    connection.commit() 
    connection.close()
    # adding the data to json File
    account = sqlite3.connect("./Employees.db")
    cr = account.cursor()
    cr.execute("SELECT * from employees")
    dataW = {}
    writeToJSONFile('/ESM/static/js','works',dataW)
    return res
###############################################################################
#        FOR PROJECTS
@app.route('/projects',methods = ["GET","POST"])
def AddProject():
    reqJ = request.get_data()
    print("bilal")
    data = json.loads(str(reqJ)[2:-1])
    res = make_response(jsonify({"message":"JSON recieved"}),200)

    connection = sqlite3.connect("./projects.db")
    cr = connection.cursor()
    projectName = data['projectName']
    date = data['date']
    description = data['description']
    cr.execute("INSERT INTO projects(project_name,date,description) VALUES (?,?,?)",(projectName,date,description))
    connection.commit() 
    connection.close()

    # addition projects data to json File
    account = sqlite3.connect("./projects.db")
    cr = account.cursor()
    cr.execute("SELECT * from projects")
    result  = cr.fetchall()
    dataP = {}
    i = 1
    for row in result:
        dataP.update({f"project{i}":{}})
        dataP[f"project{i}"]["projectName"] = row[0]
        dataP[f"project{i}"]["date"] =   row[1]
        dataP[f"project{i}"]["description"] = row[2]
        i = i+1

        writeToJSONFile('/ESM/static/js','projects',dataP)
    return res

@app.route('/delet_project',methods = ["GET","POST"])
def delet_project():
    reqJ = request.get_data()
    data = json.loads(str(reqJ)[2:-1])
    res = make_response(jsonify({"message":"delet project done"}),200)
    connection = sqlite3.connect("./projects.db")
    cr = connection.cursor()
    project_Name = data['project_name_delet']
    cr.execute(f"delete from projects where project_name = '{project_Name}'")
    connection.commit() 
    connection.close()
    # addition projects data to json File
    account = sqlite3.connect("./projects.db")
    cr = account.cursor()
    cr.execute("SELECT * from projects")
    result  = cr.fetchall()
    dataP = {}
    i = 1
    for row in result:
        dataP.update({f"project{i}":{}})
        dataP[f"project{i}"]["projectName"] = row[0]
        dataP[f"project{i}"]["date"] =   row[1]
        dataP[f"project{i}"]["description"] = row[2]
        i = i+1

        writeToJSONFile('/ESM/static/js','projects',dataP)
    return res
###########################################################################
#        FOR ACCOUNT
@app.route('/account',methods = ["GET","POST"])
def AddAccount():
    reqJ = request.get_data()
    print("bilal")
    data = json.loads(str(reqJ)[2:-1])
    print(data)
    res = make_response(jsonify({"message":"JSON account recieved"}),200)

    name = data['employeeName']
    usernameA = data['username']
    passwordA = data['password']
    power = data['power']
    connection = sqlite3.connect("./accounts.db")
    cr = connection.cursor()
    cr.execute("INSERT INTO account(employee_name,username,password,powers) VALUES (?,?,?,?)",(name,usernameA,passwordA,power))
    connection.commit() 
    connection.close()

    # adding the data to json File
    account = sqlite3.connect("./accounts.db")
    cr = account.cursor()
    cr.execute("SELECT * from account")
    result  = cr.fetchall()
    dataA = {}
    i = 1
    for row in result:
        dataA.update({f"user{i}":{}})
        dataA[f"user{i}"]["employeeName"] = row[0]
        dataA[f"user{i}"]["username"] = row[1]
        dataA[f"user{i}"]["password"] =   row[2]
        dataA[f"user{i}"]["power"] =   row[3]
        i = i+1

    writeToJSONFile('/ESM/static/js','account',dataA)
    return res

@app.route('/delet_account',methods = ["GET","POST"])
def delet_account():
    reqJ = request.get_data()
    data = json.loads(str(reqJ)[2:-1])
    res = make_response(jsonify({"message":"delet account done"}),200)
    connection = sqlite3.connect("./accounts.db")
    cr = connection.cursor()

    account_Name = data['account_name_delet']

    cr.execute(f"delete from account where employee_name = '{account_Name}'")
    connection.commit() 
    connection.close()

    # adding the data to json File
    account = sqlite3.connect("./accounts.db")
    cr = account.cursor()
    cr.execute("SELECT * from account")
    result  = cr.fetchall()
    dataA = {}
    i = 1
    for row in result:
        dataA.update({f"user{i}":{}})
        dataA[f"user{i}"]["employeeName"] = row[0]
        dataA[f"user{i}"]["username"] = row[1]
        dataA[f"user{i}"]["password"] =   row[2]
        dataA[f"user{i}"]["power"] =   row[3]
        i = i+1

    writeToJSONFile('/ESM/static/js','account',dataA)
    return res

if __name__ == '__main__':
    app.run(debug=True)