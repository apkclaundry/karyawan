import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

// Fungsi untuk menampilkan data karyawan
function displayEmployees() {
    const employeeTableBody = document.querySelector('#employee-table tbody');
    const employeeList = document.querySelector('.employee-list');
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
  
    employeeTableBody.innerHTML = ''; // Reset tabel
    employeeList.innerHTML = ''; // Reset list
  
    employees.forEach((employee, index) => {
      // Menambahkan data ke dalam tabel
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.role}</td>
        <td class="actions">
          <button class="edit" onclick="editEmployee(${index})">&#9998;</button>
          <button class="delete" onclick="deleteEmployee(${index})">&#128465;</button>
        </td>
      `;
      employeeTableBody.appendChild(row);
  
      // Menambahkan data ke dalam list untuk tampilan mobile
      const listItem = document.createElement('div');
      listItem.classList.add('employee-item');
      listItem.innerHTML = `
        <p><strong>Nama Karyawan:</strong> ${employee.name}</p>
        <p><strong>Role:</strong> ${employee.role}</p>
        <div class="actions">
          <button class="edit" onclick="editEmployee(${index})">&#9998;</button>
          <button class="delete" onclick="deleteEmployee(${index})">&#128465;</button>
        </div>
      `;
      employeeList.appendChild(listItem);
    });
  }
  
  function deleteEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.splice(index, 1); // Menghapus item berdasarkan index
    localStorage.setItem('employees', JSON.stringify(employees));
    displayEmployees(); // Menampilkan ulang data setelah penghapusan
  }
  
  function editEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees[index];
  
    // Menampilkan SweetAlert2 popup untuk mengedit data karyawan
    Swal.fire({
      title: 'Edit Karyawan',
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Nama Karyawan" value="${employee.name}">
        <select id="swal-input-role" class="swal2-input">
          <option value="Laundry Cleaner" ${employee.role === 'Laundry Cleaner' ? 'selected' : ''}>Laundry Cleaner</option>
          <option value="Laundry Iron" ${employee.role === 'Laundry Iron' ? 'selected' : ''}>Laundry Iron</option>
          <option value="Laundry Kurir" ${employee.role === 'Laundry Kurir' ? 'selected' : ''}>Laundry Kurir</option>
          <option value="Laundry Kasir" ${employee.role === 'Laundry Kasir' ? 'selected' : ''}>Laundry Kasir</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input-name').value.trim();
        const role = document.getElementById('swal-input-role').value;
  
        if (name && role) {
          employees[index] = { name, role };  // Update data karyawan
          localStorage.setItem('employees', JSON.stringify(employees));
          displayEmployees();  // Menampilkan data terbaru
        } else {
          Swal.showValidationMessage('Mohon lengkapi data!');
        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employee-form');
    let editingIndex = null;
  
    // Event listener untuk form
    employeeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('employee-name').value.trim();
      const role = document.getElementById('employee-role').value;
  
      if (name && role) {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        if (editingIndex !== null) {
          // Jika sedang mengedit, update data karyawan
          employees[editingIndex] = { name, role };
          editingIndex = null; // Reset index edit
        } else {
          // Menambahkan karyawan baru
          employees.push({ name, role });
        }
  
        localStorage.setItem('employees', JSON.stringify(employees));
        displayEmployees(); // Menampilkan ulang data setelah disimpan
        employeeForm.reset(); // Reset form
      } else {
        alert('Mohon lengkapi data!');
      }
    });
  
    // Menampilkan data saat halaman dimuat
    displayEmployees();
  });
  
  window.editEmployee = editEmployee;
  window.deleteEmployee = deleteEmployee;
