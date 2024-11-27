"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    viewDepartments: 'SELECT * FROM departments',
    viewRoles: `
        SELECT roles.id, roles.title, roles.salary, departments.name AS departments
        FROM roles
        INNER JOIN departments ON roles.department_id = departments.id
    `,
    viewEmployees: `
        SELECT 
            e.id, e.first_name, e.last_name, 
            roles.title, departments.name AS departments, 
            roles.salary, m.first_name AS manager
        FROM employees e
        INNER JOIN roles ON e.role_id = roles.id
        INNER JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees m ON e.manager_id = m.id
    `,
    addDepartment: 'INSERT INTO departments (name) VALUES ($1)',
    addRole: 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
    addEmployee: 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    updateEmployeeRole: 'UPDATE employees SET role_id = $1 WHERE id = $2',
};
