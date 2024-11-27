"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const connection_1 = require("./connection");
const queries_1 = require("./queries");
const mainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = yield inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        },
    ]);
    switch (action) {
        case 'View all departments':
            yield viewDepartments();
            break;
        case 'View all roles':
            yield viewRoles();
            break;
        case 'View all employees':
            yield viewEmployees();
            break;
        case 'Add a department':
            yield addDepartment();
            break;
        case 'Add a role':
            yield addRole();
            break;
        case 'Add an employee':
            yield addEmployee();
            break;
        case 'Update an employee role':
            yield updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    mainMenu();
});
const viewDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, connection_1.query)(queries_1.queries.viewDepartments);
    console.table(rows);
});
const viewRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, connection_1.query)(queries_1.queries.viewRoles);
    console.table(rows);
});
const viewEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, connection_1.query)(queries_1.queries.viewEmployees);
    console.table(rows);
});
const addDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = yield inquirer_1.default.prompt([
        { type: 'input', name: 'name', message: 'Enter department name:' },
    ]);
    yield (0, connection_1.query)(queries_1.queries.addDepartment, [name]);
    console.log('Department added successfully!');
});
const addRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const { title, salary, department_id } = yield inquirer_1.default.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter role salary:' },
        { type: 'input', name: 'department_id', message: 'Enter department ID for the role:' },
    ]);
    yield (0, connection_1.query)(queries_1.queries.addRole, [title, salary, department_id]);
    console.log('Role added successfully!');
});
const addEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, role_id, manager_id } = yield inquirer_1.default.prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'input', name: 'role_id', message: 'Enter role ID:' },
        { type: 'input', name: 'manager_id', message: 'Enter manager ID (optional):' },
    ]);
    yield (0, connection_1.query)(queries_1.queries.addEmployee, [first_name, last_name, role_id, manager_id || null]);
    console.log('Employee added successfully!');
});
const updateEmployeeRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const { employee_id, role_id } = yield inquirer_1.default.prompt([
        { type: 'input', name: 'employee_id', message: 'Enter employee ID to update:' },
        { type: 'input', name: 'role_id', message: 'Enter new role ID:' },
    ]);
    yield (0, connection_1.query)(queries_1.queries.updateEmployeeRole, [role_id, employee_id]);
    console.log('Employee role updated successfully!');
});
mainMenu();
