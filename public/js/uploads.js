const input = document.getElementById("file-input");
const table = document.getElementById("excel-table");

input.addEventListener("change", (event) => {
  const file = event.target.files[0];

  readXlsxFile(file).then((rows) => {
    // Clear the table
    table.innerHTML = "";

    // Add the rows to the table
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  });
});
