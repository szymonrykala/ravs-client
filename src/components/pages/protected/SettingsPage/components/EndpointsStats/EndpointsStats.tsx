import Box from '@mui/material/Box';
import TabHeadLine from '../../../../../../shared/components/TabHeadLine';
import { ChartsContext } from '../../../components/Charts/ChartsContext';
import SortableTable from './SortableTable';



export default function EndpointsStats() {
	return (
		<Box sx={{ width: '100%' }}>
			<ChartsContext>
				<TabHeadLine
					title='Parametry endpointów'
					subtitle="Wylistowane są wszystkie ścieżki na jakie aplikacja serwerowa dostaje zapytania od wszystkich aplikacji klienckich.
				Parametry wydajnościowe dla każdej z nich mogą być pomocne w konfigurowaniu oraz planowaniu rozwoju aplikacji."
				/>

				<SortableTable />
			</ChartsContext>
		</Box>
	);
}
