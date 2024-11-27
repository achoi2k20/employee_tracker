"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    viewDepartments: 'SELECT * FROM department',
    viewRoles: `
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        INNER JOIN department ON role.department_id = department.id
    `,
    viewEmployees: `
        SELECT 
            e.id, e.first_name, e.last_name, 
            role.title, department.name AS department, 
            role.salary, m.first_name AS manager
        FROM employee e
        INNER JOIN role ON e.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `,
    addDepartment: 'INSERT INTO department (name) VALUES ($1)',
    addRole: 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    addEmployee: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    updateEmployeeRole: 'UPDATE employee SET role_id = $1 WHERE id = $2',
};
