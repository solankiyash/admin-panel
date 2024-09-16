import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProjects,
  deleteProject,
  updateProject,
  addProject,
} from "../../Store/projectslice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function subtotal(items) {
  return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}

function Estimate() {
  const dispatch = useDispatch();
  const { projects = [], isLoading = false, error = null } = useSelector(
    (state) => state.user || {}
  );
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    quantity: 1,
    unit: 0,
    total: 0, // Calculated total
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    // Optional: Add any other logic you might need on project change
  }, [projects]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleEditClick = (row) => {
    setEditingRow(row.id);
    setFormData({ ...row });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleInputChangeAddData = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...newProject,
      [name]: value,
    };

    // Update total whenever quantity or unit price changes
    newFormData.total = newFormData.quantity * newFormData.unit;

    setNewProject(newFormData);
  };

  const handleAddProject = () => {
    dispatch(addProject(newProject))
      .unwrap()
      .then(() => {
        setNewProject({
          title: "",
          description: "",
          quantity: 1,
          unit: 0,
          total: 0,
        });
        setIsAdding(false);
      })
      .catch((err) => {
        console.error("Add failed:", err);
      });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewProject({
      title: "",
      description: "",
      quantity: 1,
      unit: 0,
      total: 0,
    });
  };

  const handleSave = () => {
    dispatch(updateProject(formData))
      .unwrap()
      .then(() => {
        setEditingRow(null);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  const rows = projects.map((proj) => ({
    id: proj.id,
    title: proj.title,
    description: proj.description,
    quantity: proj.quantity || 1,
    unit: parseFloat(proj.unit) || 0,
    total: priceRow(proj.quantity || 1, parseFloat(proj.unit) || 0), // Calculate total for each row
  }));

  // Include new projects in the calculation
  const allProjects = [...rows, newProject].filter(p => p.id); // Only include projects with an ID

  const invoiceSubtotal = subtotal(allProjects);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <div>
      <Button
        onClick={() => setIsAdding(true)}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Project
      </Button>

      {isAdding && (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <TextField
            name="title"
            label="Title"
            value={newProject.title}
            onChange={handleInputChangeAddData}
          />
          <TextField
            name="description"
            label="Description"
            value={newProject.description}
            onChange={handleInputChangeAddData}
          />
          <TextField
            name="quantity"
            type="number"
            label="Quantity"
            value={newProject.quantity}
            onChange={handleInputChangeAddData}
          />
          <TextField
            name="unit"
            type="number"
            label="Unit Price"
            value={newProject.unit}
            onChange={handleInputChangeAddData}
          />
          <TextField
            name="total"
            label="Total"
            value={ccyFormat(newProject.total)}
            disabled // Total is calculated automatically
          />
          <Button
            onClick={handleAddProject}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            onClick={handleCancelAdd}
            variant="outlined"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="project table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell> {/* Total for each row */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProjects.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.id === editingRow ? (
                    <TextField
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    row.description
                  )}
                </TableCell>
                <TableCell>
                  {row.id === editingRow ? (
                    <TextField
                      name="title"
                      value={formData.title || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    row.title
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.id === editingRow ? (
                    <TextField
                      name="quantity"
                      value={formData.quantity || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    row.quantity
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.id === editingRow ? (
                    <TextField
                      name="unit"
                      value={formData.unit || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    ccyFormat(row.unit)
                  )}
                </TableCell>
                <TableCell align="right">{ccyFormat(row.total)}</TableCell> {/* Display calculated total */}
                <TableCell align="right">
                  {row.id === editingRow ? (
                    <>
                      <Button onClick={handleSave}>Save</Button>
                      <Button onClick={() => setEditingRow(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditClick(row)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProject(row.id)}>
                        <RemoveIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {/* Subtotal, Tax, and Total rows */}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Estimate;
