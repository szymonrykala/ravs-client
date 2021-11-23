import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useSettings } from '../SettingsContext';
import useNotification from '../../../../contexts/NotificationContext/useNotification';
import { DatesQueryParams } from '../../../../services/interfaces';
import TablePagination from '@mui/material/TablePagination';
import TabHeadLine from '../../../../shared/components/TabHeadLine';



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';


function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (
		a: { [key in Key]: number | string },
		b: { [key in Key]: number | string },
	) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}


interface EndpointChartData {
	method: string,
	calls: number,
	generalEndpoint: string,
	avgTime: number,
	timeForEndpoint: number
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof EndpointChartData;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'method',
		numeric: false,
		disablePadding: true,
		label: 'Metoda',
	},
	{
		id: 'generalEndpoint',
		numeric: false,
		disablePadding: false,
		label: 'Ścieżka',
	},
	{
		id: 'calls',
		numeric: true,
		disablePadding: false,
		label: 'Liczba zapytań',
	},
	{
		id: 'timeForEndpoint',
		numeric: true,
		disablePadding: false,
		label: 'Całkowity czas',
	},
	{
		id: 'avgTime',
		numeric: true,
		disablePadding: false,
		label: 'Śr. czas wykonania',
	},
];

interface EnhancedTableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof EndpointChartData) => void;
	order: Order;
	orderBy: string;
}


function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } =
		props;
	const createSortHandler =
		(property: keyof EndpointChartData) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						padding={'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}




export default function EndpointsStats() {
	const { getEndpointsData } = useSettings();
	const notify = useNotification();

	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(0);

	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof EndpointChartData>('generalEndpoint');

	const [data, setData] = React.useState<EndpointChartData[]>([]);


	const load = React.useCallback(async () => {
		try {
			const resp: any = await getEndpointsData({} as DatesQueryParams);
			setData(resp.data.endpoints as EndpointChartData[]);

		} catch (err: any) {
			notify(err.description, 'error');
		}
	}, [notify]);


	React.useEffect(() => {
		load()
	}, [load]);


	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof EndpointChartData,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};


	return (
		<Box sx={{ width: '100%' }}>
			<TabHeadLine
				title='Parametry endpointów'
				subtitle="Wylistowane są wszystkie ścieżki na jakie aplikacja serwerowa dostaje zapytania od wszystkich aplikacji klienckich.
				Parametry wydajnościowe dla każdej z nich mogą być pomocne w konfigurowaniu oraz planowaniu rozwoju aplikacji."
			/>

			<TableContainer>
				<Table
					sx={{ minWidth: 550 }}
					aria-labelledby="Endpointy aplikacji"
					size='medium'
				>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}

					/>
					<TableBody>
						{data.slice().sort(getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) =>
								<TableRow
									hover
									key={index}
								>
									<TableCell >{row.method}</TableCell>
									<TableCell>{row.generalEndpoint}</TableCell>
									<TableCell >{row.calls}</TableCell>
									<TableCell >{Math.round(row.timeForEndpoint * 1000) / 1000}</TableCell>
									<TableCell >{Math.round(row.avgTime * 1000) / 1000}</TableCell>
								</TableRow>
							)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
}
