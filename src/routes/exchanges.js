import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { fetchRates, changeBase } from '../slices/ratesSlice.js';

const columns = [
  { field: 'code', headerName: 'Цифр. код', type: 'number', width: 120 },
  { field: 'currancy', headerName: 'Букв. код', width: 120 },
  {
    field: 'nominal',
    headerName: 'Единиц',
    type: 'number',
    sortable: false,
    width: 120,
  },
  { field: 'name', headerName: 'Валюта', width: 250 },
  {
    field: 'rate',
    headerName: 'Курс',
    sortable: false,
    width: 120,
    valueGetter: (params) => `${Math.round(params.row.rate * 10000) / 10000}`,
  },
];

export default function Exchanges() {
  const { currencies } = useSelector((state) => state.rates);
  console.log(currencies);

  const rows = currencies.ids.map((id) => currencies.entities[id]);

  const names = [...currencies.ids];
  const [name, setName] = useState(currencies.base.id || 'RUB');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  const handleFetchRates = () => {
    dispatch(fetchRates());
  };

  const handleChangeBase = (e) => {
    const { value } = e.target;
    setName(value);
    dispatch(changeBase({ value }));
  };

  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Button variant='contained' color='success' onClick={handleFetchRates}>
          Обновить курсы валют
        </Button>
      </Box>

      {name ? (
        <Box sx={{ py: 3 }}>
          <FormControl fullWidth>
            <InputLabel id='base-label'>Сменить базовую валюту</InputLabel>
            <Select
              labelId='base-label'
              id='base'
              value={name}
              label='Сменить базовую валюту'
              onChange={handleChangeBase}
            >
              {names.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
        ''
      )}
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableSelectionOnClick
          hideFooterPagination
          hideFooter
          // disableExtendRowFullWidth
        />
      </div>

      <a href='https://www.cbr-xml-daily.ru/'>Курсы ЦБ РФ в XML и JSON, API</a>
    </>
  );
}
