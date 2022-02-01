import React from 'react'
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid'

import { useBootcampsList } from 'common/hooks/bootcamps'
import router from 'next/router'
import { routes } from 'common/routes'

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { endpoints } from 'common/api-endpoints'

const handleEditClick = (id) => (event) => {
  event.stopPropagation();
  apiRef.current.setRowMode(id, 'edit');
};

const handleSaveClick = (id) => async (event) => {
  event.stopPropagation();
  // Wait for the validation to run
  const isValid = await apiRef.current.commitRowChange(id);
  if (isValid) {
    apiRef.current.setRowMode(id, 'view');
    const row = apiRef.current.getRow(id);
    apiRef.current.updateRows([{ ...row, isNew: false }]);
  }
};

const handleDeleteClick = (id) => (event) => {
  event.stopPropagation();
  apiRef.current.updateRows([{ id, _action: 'delete' }]);
};

const handleCancelClick = (id) => (event) => {
  event.stopPropagation();
  apiRef.current.setRowMode(id, 'view');

  const row = apiRef.current.getRow(id);
  if (row.isNew) {
    apiRef.current.updateRows([{ id, _action: 'delete' }]);
  }
};

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'firstName',
    headerName: 'First Name',
    editable: true,
    width: 200,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    editable: true,
    width: 200,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      // const isInEditMode = endpoints.current.getRowMode(id) === 'edit';
      const isInEditMode = 'edit';
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id)}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
],
];

export default function BootcampsGrid() {
  const { data } = useBootcampsList()

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      pageSize={5}
      editMode="row"
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
      onRowClick={(row) => {
        const id = row.getValue(row.id, 'id')
        if (typeof id !== 'string') return
        router.push(routes.bootcamps.viewBootcampById(id))
      }}
    />
  )
}
